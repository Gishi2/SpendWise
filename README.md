# SpendWise 💸
 
A personal budget and expense tracker built to learn full-stack web development with modern tools.
 
## Stack
 
| Layer | Technology |
|---|---|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| Database | PostgreSQL |
| Local Dev | Docker (PostgreSQL container) |
| Deployment | Google Cloud Platform |
 
## Project Structure
 
```
spendwise/
  .env                        ← Root-level: DB_USER + DB_PASSWORD for Docker Compose only
  docker-compose.yml          ← Runs local PostgreSQL on port 5433
  .gitignore
  client/                     ← React frontend
    src/
      api/expenses.js         ← All fetch calls to the backend API
      components/
        ExpenseForm.jsx
        ExpenseList.jsx
        ExpenseSummary.jsx
      App.jsx
    .env.production           ← VITE_API_URL pointing to Cloud Run (not secret)
    firebase.json             ← Firebase Hosting config
    .firebaserc               ← Firebase project binding
    vite.config.js
  server/                     ← Express backend
    src/
      controllers/expensesController.js
      db/
        db.js                 ← PostgreSQL pool (handles local vs production connection)
        init.sql              ← Table schema
      routes/expenses.js
      index.js                ← Entry point, listens on process.env.PORT || 8080
    Dockerfile                ← Production image for Cloud Run
    .env                      ← Local dev only: DB_HOST, DB_PORT, DB_USER etc (gitignored)
    package.json
```
 
## Local Development
 
Make sure Docker Desktop is running, then:
 
```bash
# Terminal 1 — start local PostgreSQL
docker compose up
 
# Terminal 2 — start backend
cd server && npm run dev
 
# Terminal 3 — start frontend
cd client && npm run dev
```
 
Frontend runs on `http://localhost:5173`, backend on `http://localhost:8080`.
 
The backend reads from `server/.env` in local dev:
 
```
DB_HOST=localhost
DB_PORT=5433
DB_USER=...
DB_PASSWORD=...
DB_NAME=spendwise
NODE_ENV=development
```
 
## Production Architecture
 
```
User → Firebase Hosting (React) → Cloud Run (Express) → Cloud SQL (PostgreSQL)
```
 
| Service | What it does | URL |
|---|---|---|
| Firebase Hosting | Serves the React frontend | https://spendwise-496409.web.app |
| Cloud Run | Runs the Express backend | https://spendwise-backend-723575131225.asia-southeast1.run.app |
| Cloud SQL | PostgreSQL database | instance: spendwise-db (asia-southeast1) |
 
Cloud Run connects to Cloud SQL via a **Unix socket** (not TCP) — no IP or port needed in production. The `db.js` file handles this automatically based on `NODE_ENV`.
 
## Deploying Changes
 
### Backend changed
```bash
docker build -t asia-southeast1-docker.pkg.dev/spendwise-496409/spendwise-backend/server:latest ./server
docker push asia-southeast1-docker.pkg.dev/spendwise-496409/spendwise-backend/server:latest
gcloud run deploy spendwise-backend \
  --image=asia-southeast1-docker.pkg.dev/spendwise-496409/spendwise-backend/server:latest \
  --region=asia-southeast1
```
 
### Frontend changed
```bash
cd client
npm run build
firebase deploy --only hosting
```
 
### Code only (no deploy needed)
```bash
git add .
git commit -m "your message"
git push origin main
```
 
## GCP Notes
 
- **Project ID:** `spendwise-496409`
- **Region:** `asia-southeast1` (Singapore)
- **Cloud SQL instance:** `spendwise-db` (Postgres 15, db-f1-micro)
- **Cloud SQL proxy command** (for local → Cloud SQL connection):
  ```bash
  cloud-sql-proxy spendwise-496409:asia-southeast1:spendwise-db --port=5434
  ```
- Port 5434 is used because 5432 = local PostgreSQL, 5433 = Docker PostgreSQL
- ISP blocks port 5432 outbound — always use the proxy, never direct IP
## Environment Variables
 
| File | Used by | Committed? |
|---|---|---|
| `.env` (root) | Docker Compose | No (gitignored) |
| `server/.env` | Node/dotenv locally | No (gitignored) |
| `client/.env.production` | Vite build | Yes (no secrets) |
| Cloud Run env vars | Production backend | Set via gcloud CLI |