# Portfolio Python backend

This FastAPI service is the private project-management API for the portfolio.

## Run it locally

```sh
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app:app --reload --port 8000
```

Set the values from `.env.example` in your shell or deployment provider. Never commit `.env`.

Open `http://localhost:8000/docs` to sign in and manage projects. The live portfolio can use `GET /projects` once the backend has been deployed to a host with persistent database storage.

## Deploying

Deploy this folder as a separate Python service. Set `DATABASE_PATH` to persistent storage or replace SQLite with a managed PostgreSQL database before a production deployment. Set `ADMIN_PASSWORD` and `ADMIN_TOKEN_SECRET` as deployment secrets.
