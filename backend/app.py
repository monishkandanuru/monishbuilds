"""Python admin API for the Monish Kandanuru portfolio.

Run locally with:
    uvicorn app:app --reload --port 8000
"""

import base64
import hashlib
import hmac
import json
import os
import secrets
import sqlite3
import time
from contextlib import contextmanager
from pathlib import Path
from typing import Annotated

from fastapi import Depends, FastAPI, Header, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, HttpUrl


DATABASE_PATH = Path(os.getenv("DATABASE_PATH", "./data/portfolio.db"))
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "")
TOKEN_SECRET = os.getenv("ADMIN_TOKEN_SECRET", "")
TOKEN_TTL_SECONDS = 60 * 60 * 12

if not ADMIN_PASSWORD or not TOKEN_SECRET:
    # The API deliberately refuses admin operations until real deployment secrets exist.
    CONFIGURED = False
else:
    CONFIGURED = True


class ProjectInput(BaseModel):
    key: str = Field(pattern=r"^[a-z0-9-]{2,50}$")
    name: str = Field(min_length=2, max_length=100)
    category: str = Field(min_length=2, max_length=40)
    type: str = Field(min_length=2, max_length=100)
    description: str = Field(min_length=2, max_length=180)
    detail: str = Field(min_length=2, max_length=1200)
    stack: str = Field(min_length=2, max_length=160)
    href: HttpUrl
    github: HttpUrl | None = None
    image: str | None = Field(default=None, max_length=500)
    image_alt: str = Field(default="", max_length=220)
    status: str = Field(default="LIVE PROJECT", max_length=40)
    features: list[str] = Field(default_factory=list, max_length=8)
    published: bool = True


class LoginInput(BaseModel):
    password: str = Field(min_length=1)


class LoginResponse(BaseModel):
    token: str
    expires_in: int


SEED_PROJECTS = [
    {
        "key": "thermowatch", "name": "ThermoWatch", "category": "Web",
        "type": "CLIMATE TECH / SIH26083", "description": "Turning heat-risk intelligence into timely action.",
        "detail": "A heatwave early-warning and decision-support prototype for Smart India Hackathon.",
        "stack": "React / TypeScript / Cloudflare", "href": "https://thermowatch-sih26083.vercel.app/",
        "github": "https://github.com/monishkandanuru/thermowatch-sih26083", "image": "/projects/thermowatch.png",
        "image_alt": "ThermoWatch command centre", "status": "LIVE PROJECT",
        "features": ["Explainable risk forecasts", "Regional-language support", "Officer response workflows"], "published": True,
    },
    {
        "key": "fitai", "name": "FitAI", "category": "Web", "type": "FITNESS / FULL-STACK APPLICATION",
        "description": "A little progress. A healthier everyday.",
        "detail": "A Python and Flask fitness journal with authenticated workout, meal, and measurement tracking.",
        "stack": "Python / Flask / SQL", "href": "https://fit-ai-olive-delta.vercel.app",
        "github": "https://github.com/monishkandanuru/FitAI", "image": "/projects/fitai.png",
        "image_alt": "FitAI fitness and nutrition coach", "status": "LIVE PROJECT",
        "features": ["Workout and meal journals", "Measurement history", "Account-based dashboard"], "published": True,
    },
]


@contextmanager
def database():
    DATABASE_PATH.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    try:
        yield connection
        connection.commit()
    finally:
        connection.close()


def initialise_database() -> None:
    with database() as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS projects (
                key TEXT PRIMARY KEY, name TEXT NOT NULL, category TEXT NOT NULL,
                type TEXT NOT NULL, description TEXT NOT NULL, detail TEXT NOT NULL,
                stack TEXT NOT NULL, href TEXT NOT NULL, github TEXT, image TEXT,
                image_alt TEXT NOT NULL, status TEXT NOT NULL, features TEXT NOT NULL,
                published INTEGER NOT NULL DEFAULT 1, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        """)
        count = connection.execute("SELECT COUNT(*) FROM projects").fetchone()[0]
        if count == 0:
            for project in SEED_PROJECTS:
                save_project(connection, project)


def save_project(connection: sqlite3.Connection, project: dict) -> None:
    connection.execute("""
        INSERT INTO projects (key, name, category, type, description, detail, stack, href, github, image, image_alt, status, features, published)
        VALUES (:key, :name, :category, :type, :description, :detail, :stack, :href, :github, :image, :image_alt, :status, :features, :published)
        ON CONFLICT(key) DO UPDATE SET
            name=excluded.name, category=excluded.category, type=excluded.type,
            description=excluded.description, detail=excluded.detail, stack=excluded.stack,
            href=excluded.href, github=excluded.github, image=excluded.image,
            image_alt=excluded.image_alt, status=excluded.status, features=excluded.features,
            published=excluded.published, updated_at=CURRENT_TIMESTAMP
    """, {**project, "features": json.dumps(project["features"]), "published": int(project["published"])})


def project_dict(row: sqlite3.Row) -> dict:
    project = dict(row)
    project["features"] = json.loads(project["features"])
    project["published"] = bool(project["published"])
    return project


def sign_token(timestamp: int) -> str:
    payload = str(timestamp)
    signature = hmac.new(TOKEN_SECRET.encode(), payload.encode(), hashlib.sha256).hexdigest()
    return base64.urlsafe_b64encode(f"{payload}.{signature}".encode()).decode().rstrip("=")


def require_admin(authorization: Annotated[str | None, Header()] = None) -> None:
    if not CONFIGURED:
        raise HTTPException(status_code=503, detail="Admin API is not configured")
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Sign in required")
    try:
        encoded = authorization.removeprefix("Bearer ")
        decoded = base64.urlsafe_b64decode(encoded + "=" * (-len(encoded) % 4)).decode()
        timestamp, signature = decoded.split(".", 1)
        expected = hmac.new(TOKEN_SECRET.encode(), timestamp.encode(), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(signature, expected) or time.time() - int(timestamp) > TOKEN_TTL_SECONDS:
            raise ValueError
    except (ValueError, UnicodeDecodeError):
        raise HTTPException(status_code=401, detail="Session expired")


origins = [origin.strip() for origin in os.getenv("PORTFOLIO_ORIGIN", "http://localhost:3000").split(",")]
app = FastAPI(title="Monish Portfolio Admin API", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["GET", "POST", "PATCH", "DELETE"], allow_headers=["Authorization", "Content-Type"])


@app.on_event("startup")
def startup() -> None:
    initialise_database()


@app.get("/health")
def health() -> dict:
    return {"status": "ok", "service": "portfolio-admin-api", "configured": CONFIGURED}


@app.post("/auth/login", response_model=LoginResponse)
def login(credentials: LoginInput) -> LoginResponse:
    if not CONFIGURED:
        raise HTTPException(status_code=503, detail="Admin API is not configured")
    if not hmac.compare_digest(credentials.password, ADMIN_PASSWORD):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect password")
    return LoginResponse(token=sign_token(int(time.time())), expires_in=TOKEN_TTL_SECONDS)


@app.get("/projects")
def public_projects() -> list[dict]:
    with database() as connection:
        rows = connection.execute("SELECT * FROM projects WHERE published = 1 ORDER BY updated_at DESC").fetchall()
    return [project_dict(row) for row in rows]


@app.get("/admin/projects", dependencies=[Depends(require_admin)])
def admin_projects() -> list[dict]:
    with database() as connection:
        rows = connection.execute("SELECT * FROM projects ORDER BY updated_at DESC").fetchall()
    return [project_dict(row) for row in rows]


@app.post("/admin/projects", status_code=201, dependencies=[Depends(require_admin)])
def create_project(project: ProjectInput) -> dict:
    with database() as connection:
        if connection.execute("SELECT 1 FROM projects WHERE key = ?", (project.key,)).fetchone():
            raise HTTPException(status_code=409, detail="A project with this key already exists")
        save_project(connection, project.model_dump(mode="json"))
    return {"ok": True, "key": project.key}


@app.patch("/admin/projects/{key}", dependencies=[Depends(require_admin)])
def update_project(key: str, project: ProjectInput) -> dict:
    if key != project.key:
        raise HTTPException(status_code=400, detail="Project key cannot be changed")
    with database() as connection:
        if not connection.execute("SELECT 1 FROM projects WHERE key = ?", (key,)).fetchone():
            raise HTTPException(status_code=404, detail="Project not found")
        save_project(connection, project.model_dump(mode="json"))
    return {"ok": True, "key": key}


@app.delete("/admin/projects/{key}", status_code=204, dependencies=[Depends(require_admin)])
def delete_project(key: str) -> None:
    with database() as connection:
        cursor = connection.execute("DELETE FROM projects WHERE key = ?", (key,))
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Project not found")
