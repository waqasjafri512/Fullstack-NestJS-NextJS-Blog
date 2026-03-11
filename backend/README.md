# Blog Website Backend (NestJS)

A powerful and scalable backend for a blog application, built with NestJS, Prisma, and PostgreSQL.

## 🚀 Features

- **Authentication**: JWT-based authentication with Passport.js.
- **Blog Management**: CRUD operations for blog posts with image support.
- **Category Management**: Organize blogs into categories.
- **Settings**: System-wide settings management.
- **Image Handling**: Integration for uploading and serving images.
- **Database**: Prisma ORM with PostgreSQL for data management.

## 🛠️ Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL
- **Security**: Passport.js, JWT, Bcrypt
- **Validation**: Class-validator, Class-transformer

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

## ⚙️ Setup Instructions

1.  **Clone the repository** (if not already done).
2.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Configure Environment Variables**:
    Create a `.env` file in the `backend` root and add:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/blogs?schema=public"
    JWT_SECRET="your_jwt_secret"
    ```
5.  **Database Migration**:
    ```bash
    npx prisma db push
    ```
6.  **Seed Database (Optional)**:
    ```bash
    npm run prisma:seed
    ```

## 🏃 Running the Application

- **Development Mode**:
  ```bash
  npm run start:dev
  ```
- **Production Mode**:
  ```bash
  npm run build
  npm run start:prod
  ```

## 🧪 Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

## 📜 API Documentation

The API endpoints are organized into the following modules:
- `/auth`: Login and registration.
- `/blogs`: Blog post management.
- `/categories`: Category management.
- `/settings`: Application settings.
- `/images`: Image upload and retrieval.

---
Built with ❤️ using NestJS.
