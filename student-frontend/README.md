# Student CRUD Application (Vite + React + Tailwind CSS)

A modern, responsive Single Page Application (SPA) built with Vite, React (JavaScript), and Tailwind CSS for managing student records via the Spring Boot REST API.

---

## Features
- **Full CRUD Operations**:
  - **Create**: Register new student records.
  - **Read**: View student list with dynamic loading and empty states.
  - **Update**: Edit existing student details with form pre-population.
  - **Delete**: Remove students with clean inline confirmation (no disruptive modal popups).
- **Non-Modal UX**:
  - Sticky side-by-side card form on desktop / fluid stacked layout on mobile.
  - Inline delete verification with immediate feedback.
- **Search & Filters**:
  - Instant client-side search by name (first/last), ID, or section.
  - Course filter dropdown.
- **Metrics Dashboard**:
  - Real-time KPIs for total students, active courses, and sections.
- **Toast Notifications**:
  - Auto-dismissing success and error alerts.
- **Zero CORS Configuration Needed**:
  - Vite reverse proxy forwards all `/sicat/*` requests directly to `http://localhost:8080`.

---

## How to Run

### 1. Start the Spring Boot Backend
Ensure PostgreSQL is running (`db_student` at `localhost:5432`). In a terminal:
```bash
cd student
./mvnw.cmd spring-boot:run
```
*(The backend runs on `http://localhost:8080`)*

### 2. Start the Vite React Frontend
In a separate terminal:
```bash
cd student-frontend
npm run dev
```
*(The frontend runs on `http://localhost:5173`)*

---

## Project Structure
```
student-frontend/
├── vite.config.js          # Reverse proxy to backend (http://localhost:8080)
├── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx      # Top navigation & refresh button
│   │   ├── StatsCards.jsx  # KPI metrics overview
│   │   ├── SearchBar.jsx   # Search & course filter
│   │   ├── StudentForm.jsx # Non-modal Add/Edit card form
│   │   ├── StudentTable.jsx# Table with inline delete confirm
│   │   └── Toast.jsx       # Floating notifications
│   ├── services/
│   │   └── studentService.js # REST API client
│   ├── App.jsx             # Main state coordinator
│   ├── index.css           # Tailwind CSS directives
│   └── main.jsx            # Entry point
```
