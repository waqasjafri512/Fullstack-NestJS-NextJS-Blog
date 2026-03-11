---
description: How to run the Blog Website (Frontend & Backend)
---

### 1. Backend Setup (NestJS)
// turbo
1. Navigate to the backend directory:
   `cd d:/blogs/backend`

2. Ensure your `.env` file has the correct `DATABASE_URL`.
   Example: `DATABASE_URL="postgresql://user:password@localhost:5432/blogs?schema=public"`

3. Synchronize the database schema:
   `npx prisma db push`

4. Start the backend in development mode:
   `npm run start:dev` (runs on http://localhost:5000)

### 2. Frontend Setup (Next.js)
// turbo
1. Navigate to the frontend directory:
   `cd d:/blogs/frontend`

2. Create a `.env.local` file if it doesn't exist and set the API URL:
   `NEXT_PUBLIC_API_URL=http://localhost:5000`

3. Start the frontend in development mode:
   `npm run dev` (runs on http://localhost:3000)

---
The backend will be available at `http://localhost:5000` and the frontend at `http://localhost:3000`.
Access the Admin Dashboard at `http://localhost:3000/admin/login`.
