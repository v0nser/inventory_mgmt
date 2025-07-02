# MERN Inventory Management System

A minimal, full-stack Inventory Management System built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features
- **Authentication** with JWT
- **Role-based access control** (Admin/User)
- **Inventory Module**
  - Admin: Create, Read, Update, Delete items
  - User: View items only
- **Responsive UI** with TailwindCSS
- **Modern, clean design**

## Tech Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Frontend:** React (Vite), TailwindCSS, Axios, React Router

## Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd inventory-mgmt
```

### 2. Setup the Backend
```bash
cd backend
cp .env.example .env
# Edit .env and set your MongoDB URI and JWT secret
npm install
npm start
```

### 3. Setup the Frontend
```bash
cd ../frontend
npm install
npm run dev
```

The frontend will be available at [http://localhost:5173](http://localhost:5173) and will proxy API requests to the backend.

## Environment Variables
Create a `.env` file in the `backend/` directory:
```
MONGO_URI=mongodb://localhost:27017/inventory_mgmt
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Usage
- **Register** as a user or admin
- **Login** to access the dashboard
- **Admins** can add, edit, or delete inventory items in the Admin Panel
- **Users** can view inventory only

## Folder Structure
```
backend/    # Express API, MongoDB models, routes, middleware
frontend/   # React app (Vite), TailwindCSS, pages, components
```
