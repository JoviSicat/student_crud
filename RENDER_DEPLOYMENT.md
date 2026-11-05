# Render.com Deployment Guide

This repository is fully configured for deployment on **[Render.com](https://render.com)**.

---

## Architecture on Render

```mermaid
graph LR
    User([User Browser]) --> Frontend["React Frontend (Static Site)<br/>student-frontend.onrender.com"]
    Frontend -- "REST API (JSON)<br/>https://student-backend.onrender.com" --> Backend["Spring Boot API (Docker Web Service)<br/>student-backend.onrender.com"]
    Backend -- "PostgreSQL JDBC" --> DB[("Render PostgreSQL<br/>student-db")]
```

---

## Option 1: Automatic 1-Click Deployment (Render Blueprint) - Recommended

Render uses the included [`render.yaml`](../render.yaml) file to automatically provision all 3 components (Database + Backend + Frontend) and connect them together.

### Step-by-Step:
1. Push your latest changes to GitHub:
   ```bash
   git add .
   git commit -m "Configure Render.com deployment"
   git push origin main
   ```
2. Log in to your [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** &rarr; **Blueprint**.
4. Connect your GitHub repository (`https://github.com/JoviSicat/student_crud.git`).
5. Render will automatically read `render.yaml` and show:
   - **Database**: `student-db` (Free PostgreSQL)
   - **Web Service**: `student-backend` (Spring Boot via Docker)
   - **Static Site**: `student-frontend` (Vite + React)
6. Click **Apply**.
7. Render will create the database, build the backend, and deploy the frontend.

---

## Option 2: Manual Deployment via Render Dashboard

If you prefer to configure each service manually on Render:

### Step 1: Create the PostgreSQL Database
1. In Render Dashboard, click **New +** &rarr; **PostgreSQL**.
2. Set:
   - **Name**: `student-db`
   - **Database**: `db_student`
   - **User**: `postgres`
   - **Region**: Choose closest (e.g. Oregon or Singapore)
   - **Plan**: Free
3. Click **Create Database**.
4. Once created, copy the **Internal Database URL** (e.g. `postgres://postgres:password@dpg-...-a/db_student`).

### Step 2: Create the Spring Boot Web Service
1. Click **New +** &rarr; **Web Service**.
2. Connect your repository `student_crud`.
3. Configure:
   - **Name**: `student-backend`
   - **Root Directory**: `student`
   - **Language / Runtime**: **Docker** (Render will use `student/Dockerfile`)
   - **Plan**: Free
4. Under **Environment Variables**, add:
   - `DATABASE_URL`: *(paste the Internal Database URL from Step 1)*
   - `PORT`: `8080`
5. Click **Create Web Service**.
6. Wait for the build to finish. Once live, copy your backend URL (e.g. `https://student-backend-xxxx.onrender.com`).

### Step 3: Create the React Frontend Static Site
1. Click **New +** &rarr; **Static Site**.
2. Connect your repository `student_crud`.
3. Configure:
   - **Name**: `student-frontend`
   - **Root Directory**: `student-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Under **Environment Variables**, add:
   - `VITE_API_BASE_URL`: `https://student-backend-xxxx.onrender.com` *(use your actual backend URL from Step 2)*
5. Under **Redirects/Rewrites**:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`
6. Click **Create Static Site**.

---

## Key Configurations Applied

1. **Dynamic Port Binding**:
   - `application.properties` sets `server.port=${PORT:8080}`, automatically binding to Render's allocated port.
2. **PostgreSQL URI Auto-Conversion**:
   - [`DatabaseConfig.java`](file:///student/src/main/java/com/sicat/student/DatabaseConfig.java) automatically parses Render's `DATABASE_URL` (converting `postgres://` or `postgresql://` into valid JDBC format `jdbc:postgresql://` and injecting credentials).
3. **CORS Enabled**:
   - [`WebConfig.java`](file:///student/src/main/java/com/sicat/student/WebConfig.java) and `@CrossOrigin(origins = "*")` allow cross-origin requests from the Render frontend to the backend.
4. **Vite Multi-Environment API Base URL**:
   - [`studentService.js`](file:///student-frontend/src/services/studentService.js) seamlessly routes to `VITE_API_BASE_URL` in production or the Vite proxy during local development.
5. **SPA Direct Routing**:
   - [`public/_redirects`](file:///student-frontend/public/_redirects) prevents 404 errors when refreshing pages on Render Static Sites.
