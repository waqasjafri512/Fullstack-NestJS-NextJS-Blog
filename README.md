# Blog Website Project

This is a full-stack blog application with a NestJS backend and a Next.js frontend.

## 📁 Project Structure

```text
.
├── backend/        # NestJS API, Prisma ORM, PostgreSQL
└── frontend/       # Next.js App, Tailwind CSS 4, Zustand
```

## 🚀 Quick Start

To get the entire project running locally, follow these steps:

### 1. Setup Backend
```bash
cd backend
npm install
# Configure .env with DATABASE_URL
npx prisma db push
npm run start:dev
```
*Detailed instructions in [backend/README.md](backend/README.md)*

### 2. Setup Frontend
```bash
cd frontend
npm install
# Configure .env.local with NEXT_PUBLIC_API_URL
npm run dev
```
*Detailed instructions in [frontend/README.md](frontend/README.md)*

## 🛠️ Tech Stack Overview

- **Frontend**: Next.js 15, Tailwind CSS 4, Radix UI, Zustand.
- **Backend**: NestJS 11, Prisma, PostgreSQL, Passport JWT.
- **Workflow**: Managed with npm/npx.

## 📝 Features

- User Authentication & Authorization.
- Blog Post CRUD with Category Management.
- Admin Dashboard for content control.
- Image Upload system.
- Modern, Responsive UI with Dark Mode.

---
Access the Frontend at `http://localhost:3000` and the API at `http://localhost:5000`.
