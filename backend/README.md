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

Open `http://localhost:8000/admin` to sign in and manage projects. The API documentation is also available at `http://localhost:8000/docs`. The live portfolio can use `GET /projects` once the backend has been deployed to a host with persistent database storage.

## Deploying

The repository includes a [`render.yaml`](../render.yaml) Blueprint for deploying this folder as a separate Python service with a persistent disk. Set `ADMIN_PASSWORD` during the Render setup; Render generates `ADMIN_TOKEN_SECRET` automatically. After deployment, add the service URL as `NEXT_PUBLIC_PORTFOLIO_API_URL` in the portfolio's Vercel environment variables and redeploy the portfolio.
