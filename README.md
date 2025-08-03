# 🩺 Patient Management System – Aisel Tech Case

This is a full-stack Patient Management System built for the Aisel Health technical case. It features a secure RESTful API built with **NestJS** and **Prisma**, and a responsive frontend built using **Next.js**, **TailwindCSS**, and **shadcn/ui**.

## 📦 Tech Stack

- **Backend:** NestJS, Prisma, PostgreSQL, JWT Auth
- **Frontend:** Next.js, TailwindCSS, shadcn/ui, React Query
- **DevOps:** Docker, Docker Compose

---

## 🚀 Getting Started

Follow these instructions to set up and run the application locally using Docker.

### 🔁 1. Clone the Repository

```bash
git clone https://github.com/Sreelatha-Vallabhaneni/PatientsManagementSystem.git
cd PatientsManagementSystem

🐳 2. Run the Application via Docker
Make sure you have Docker and Docker Compose installed.

 docker-compose up --build

This will:
Build and start the backend, frontend, and PostgreSQL containers
Automatically run database migrations and Prisma generate
Start both apps in development mode

🖥️ 3. Access the App
Frontend (Next.js): http://localhost:3000
Backend (NestJS API): http://localhost:5001
⚙️ Backend Overview
Located in ./backend/api
📁 Key Scripts
Command	Description:
npm run start:dev	Start NestJS in watch mode
npm run seed	Seed the database (optional)
npx prisma studio	Browse DB via Prisma Studio
npx prisma migrate dev	Apply pending DB migrations

🔐 Roles & Auth
Admin: Full access to create, update, delete, and view patients
User: Read-only access

Authentication is handled using JWT tokens. Only authorized users can access protected routes.
💻 Frontend Overview
Located in ./frontend
📁 Key Scripts
Command	Description
npm run dev	Start Next.js in dev mode
npm run build	Build the production app
Uses React Query for fetching data from the backend
Includes login form, token-based API access, and CRUD UI
Responsive UI powered by Tailwind + shadcn
☁️ Deployment Recommendations
Part	Recommended Platform	Reason
Frontend	Vercel	Fast, free, optimized for Next.js
Backend	Render or Fly.io	Easy Docker support
Database	Supabase (PostgreSQL)	Free tier, hosted DB
we can also use AWS Amplify or S3 for the frontend, and AWS ECS/EC2 for backend if preferred.
📌 Notes & Design Priorities
Focus: Emphasis on backend structure, role-based access control, and responsive UI/UX
Scalability: Backend follows modular NestJS architecture
Security: JWT token auth, env-based secrets, DB access control
Dev Experience: Dockerized setup, Prisma Studio for DB UI
