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
Frontend (Deployed on Vercel): https://patientsmanagementsystem.vercel.app
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

| Part     | Platform                                              | Notes                                       |
| -------- | ----------------------------------------------------- | ----------------------------------------    |
| Frontend | [Vercel](https://patientsmanagementsystem.vercel.app) | Deployed here. Chosen for its seamless
                                                                     integration with Next.js, automatic CI/CD,
                                                                     and fast global delivery.                   |
                                                                         
| Backend  | Render or Fly.io *(Recommended)*                      | Not deployed yet. These platforms
                                                                     are suitable for Docker-based NestJS apps
                                                                     with simple CI pipelines.                   |
                                                                         
| Database | Supabase *(Recommended)*                              | Recommended for hosted PostgreSQL
                                                                     with a generous free tier. 
                                                                     Currently running locally via Docker.       |


📌 Notes & Design Priorities
🎯 Focus Areas
While building this solution, I deliberately focused on the following aspects:

# Backend Structure & Scalability: Designed the NestJS backend with a modular
  architecture to ensure the codebase remains scalable and maintainable as features grow.
# Role-Based Access Control (RBAC): Implemented secure role-based permissions
  (Admin/User) using JWT to demonstrate backend authorization and control mechanisms.
# Developer Experience: Set up a Dockerized environment with automated Prisma migrations
  and seeding for easy onboarding and reproducibility.
# Responsive UI/UX: Built the frontend using TailwindCSS and shadcn/ui
  to provide a modern, accessible, and responsive user interface across devices.
# API Security: Focused on protecting routes with JWT auth and validating
  requests thoroughly at both backend and frontend layers.

These choices reflect a balanced approach aimed at delivering a solution
that is cleanly architected, secure, and user-friendly while being ready to scale.

