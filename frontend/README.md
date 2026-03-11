# Blog Website Frontend (Next.js)

A modern, responsive frontend for the blog website, built with Next.js, Tailwind CSS 4, and Zustand.

## 🚀 Features

- **Dynamic Blog Listing**: View blogs with pagination and category filtering.
- **Admin Dashboard**: Comprehensive dashboard for managing blogs, categories, and settings.
- **Rich Text Editor**: Integrated `react-quill-new` for content creation.
- **State Management**: Lightweight and fast state management using `Zustand`.
- **Responsive Design**: Mobile-first design using Tailwind CSS 4.
- **Dark Mode**: Built-in dark mode support via `next-themes`.
- **UI Components**: Modern UI components from Radix UI and Lucide Icons.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## ⚙️ Setup Instructions

1.  **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Configure Environment Variables**:
    Create a `.env.local` file in the `frontend` root and add:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:5000
    ```
4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## 🏃 Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components.
- `src/store`: Zustand stores for global state.
- `src/lib`: Utility functions and API clients.

## 📜 Access

- **Frontend**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin/login

---
Built with ❤️ using Next.js.
