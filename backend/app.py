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
from fastapi.responses import HTMLResponse
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
    {
        "key": "newgen", "name": "NewGen Technologies", "category": "Web", "type": "CLIENT WORK / BUSINESS WEBSITE",
        "description": "An established engineering business, clearly presented.",
        "detail": "A collaborative website project for a pharmaceutical and cleanroom infrastructure company.",
        "stack": "Next.js / Tailwind CSS", "href": "https://newgenprojects.in", "github": None,
        "image": "/projects/newgen.png", "image_alt": "NewGen Technologies website", "status": "LIVE PROJECT",
        "features": ["Service-focused architecture", "Responsive layouts", "Collaborative development"], "published": True,
    },
    {
        "key": "spendwise", "name": "SpendWise", "category": "Web", "type": "PERSONAL FINANCE / WEB APPLICATION",
        "description": "Make sense of where your money goes.",
        "detail": "A personal expense tracker with account sign-in and a focused interface for understanding spending.",
        "stack": "React / Vercel", "href": "https://spendwisemanagement.vercel.app", "github": "https://github.com/monishkandanuru/spendwise",
        "image": "/projects/spendwise.png", "image_alt": "SpendWise public sign-in screen", "status": "LIVE PROJECT",
        "features": ["Account sign-in", "Expense tracking", "Spending overview"], "published": True,
    },
    {
        "key": "vaulteye", "name": "VaultEye", "category": "Android", "type": "ANDROID / PRIVACY & FINANCE",
        "description": "A different perspective on your digital life.",
        "detail": "An Android project exploring the relationship between privacy and personal finance intelligence.",
        "stack": "Android", "href": "https://github.com/monishkandanuru/VaultEye", "github": "https://github.com/monishkandanuru/VaultEye",
        "image": None, "image_alt": "", "status": "SOURCE AVAILABLE",
        "features": ["Android project", "Privacy & finance concept", "Public project repository"], "published": True,
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

ADMIN_PAGE = """<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Portfolio Admin</title><style>
*{box-sizing:border-box}body{margin:0;background:#111612;color:#eef0e8;font:16px system-ui,sans-serif}.shell{max-width:960px;margin:0 auto;padding:48px 24px}h1{font-size:42px;margin:0 0 8px}p{color:#adb5a6}.card{background:#1b211c;border:1px solid #364039;border-radius:18px;padding:24px;margin-top:24px}input,textarea,button{font:inherit;border-radius:9px;padding:12px}input,textarea{width:100%;background:#101510;border:1px solid #414b43;color:#fff;margin:8px 0 16px}textarea{min-height:360px;font:13px ui-monospace,monospace}button{background:#dfeabc;color:#1d281a;border:0;font-weight:700;cursor:pointer;margin-right:8px}.danger{background:#432422;color:#ffd9d5}.muted{background:#313a33;color:#fff}.projects{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px}.project{width:100%;text-align:left;background:#273129;color:#fff}.hidden{display:none}.note{min-height:24px;color:#dfeabc}</style></head>
<body><main class="shell"><h1>Portfolio admin</h1><p>Manage the projects shown on your portfolio.</p>
<section id="login" class="card"><label>Admin password<input id="password" type="password" autocomplete="current-password"></label><button onclick="login()">Sign in</button><p id="loginNote" class="note"></p></section>
<section id="workspace" class="hidden"><div class="card"><button onclick="newProject()">New project</button><button class="muted" onclick="loadProjects()">Refresh</button><div id="projectList" class="projects" style="margin-top:18px"></div></div>
<div class="card"><h2 id="editorTitle">Project</h2><p>Edit fields as JSON. Keep the project key unchanged when updating an existing project.</p><textarea id="editor"></textarea><p id="note" class="note"></p><button onclick="saveProject()">Save changes</button><button class="danger" onclick="deleteProject()">Delete project</button></div></section></main>
<script>
let token=sessionStorage.getItem('portfolioAdminToken')||'', activeKey='';
const loginPanel=document.getElementById('login'), workspacePanel=document.getElementById('workspace'), passwordInput=document.getElementById('password'), loginNote=document.getElementById('loginNote'), projectList=document.getElementById('projectList'), editor=document.getElementById('editor'), editorTitle=document.getElementById('editorTitle'), note=document.getElementById('note');
const headers=()=>({'Content-Type':'application/json','Authorization':'Bearer '+token});
async function login(){const res=await fetch('/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:passwordInput.value})});if(!res.ok){loginNote.textContent='Incorrect password or server not configured.';return}token=(await res.json()).token;sessionStorage.setItem('portfolioAdminToken',token);loginPanel.classList.add('hidden');workspacePanel.classList.remove('hidden');loadProjects()}
async function loadProjects(){const res=await fetch('/admin/projects',{headers:headers()});if(!res.ok){note.textContent='Your session has expired. Sign in again.';return}const items=await res.json();projectList.innerHTML='';items.forEach(project=>{const button=document.createElement('button');button.className='project';button.textContent=project.name+(project.published?'':' (hidden)');button.onclick=()=>selectProject(project);projectList.append(button)});if(items.length&&!activeKey)selectProject(items[0])}
function selectProject(project){activeKey=project.key;editorTitle.textContent=project.name;editor.value=JSON.stringify(project,null,2);note.textContent=''}
function newProject(){activeKey='';editorTitle.textContent='New project';editor.value=JSON.stringify({key:'new-project',name:'New project',category:'Web',type:'WEB APPLICATION',description:'Short project description.',detail:'Describe the project and its outcome.',stack:'Python / FastAPI',href:'https://example.com',github:null,image:null,image_alt:'',status:'LIVE PROJECT',features:['First feature'],published:true},null,2);note.textContent=''}
async function saveProject(){let project;try{project=JSON.parse(editor.value)}catch{note.textContent='Please fix the JSON first.';return}const method=activeKey?'PATCH':'POST',url=activeKey?'/admin/projects/'+encodeURIComponent(activeKey):'/admin/projects';const res=await fetch(url,{method,headers:headers(),body:JSON.stringify(project)});note.textContent=res.ok?'Saved.':((await res.json()).detail||'Could not save.');if(res.ok){activeKey=project.key;loadProjects()}}
async function deleteProject(){if(!activeKey||!confirm('Delete this project?'))return;const res=await fetch('/admin/projects/'+encodeURIComponent(activeKey),{method:'DELETE',headers:headers()});if(res.ok){activeKey='';newProject();loadProjects()}else note.textContent='Could not delete.'}
if(token){loginPanel.classList.add('hidden');workspacePanel.classList.remove('hidden');loadProjects()}
</script></body></html>"""


@app.on_event("startup")
def startup() -> None:
    initialise_database()


@app.get("/health")
def health() -> dict:
    return {"status": "ok", "service": "portfolio-admin-api", "configured": CONFIGURED}


@app.get("/admin", response_class=HTMLResponse, include_in_schema=False)
def admin_page() -> str:
    return ADMIN_PAGE


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
