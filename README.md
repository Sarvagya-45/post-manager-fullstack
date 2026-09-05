# Post Manager

A full-stack Post Management application built with **React, Node.js, Express.js, MongoDB, and JWT Authentication**.

The application allows authenticated users to create, view, update, and delete their posts through a secure dashboard.

## 🚀 Live Demo

**Frontend:**
`https://your-project.vercel.app`

**Backend API:**
`https://your-project-api.onrender.com`

> Replace these URLs with your actual deployed URLs after deployment.

---

## ✨ Features

- User Registration
- User Login
- JWT-based Authentication
- Protected Dashboard
- Create Posts
- View Posts
- Update Posts
- Delete Posts
- MongoDB Database Integration
- REST API
- Responsive User Interface
- Secure Password Hashing with bcrypt
- Frontend and Backend deployed separately

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Axios
- React Router DOM
- JavaScript
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- CORS
- dotenv

### Deployment

- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

---

## 📁 Project Structure

```text
post-manager-fullstack/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

---

## 🔐 Authentication Flow

The application uses **JSON Web Tokens (JWT)** for authentication.

```text
User
 │
 ▼
Register / Login
 │
 ▼
Backend validates credentials
 │
 ▼
JWT Token Generated
 │
 ▼
Token stored in localStorage
 │
 ▼
Protected API Request
 │
 ▼
JWT Authentication Middleware
 │
 ▼
Authorized User
```

Protected requests include the JWT token in the `Authorization` header.

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

### Posts

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| GET    | `/api/posts`     | Get posts     |
| POST   | `/api/posts`     | Create a post |
| PUT    | `/api/posts/:id` | Update a post |
| DELETE | `/api/posts/:id` | Delete a post |

Post routes require authentication.

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/post-manager-fullstack.git
```

```bash
cd post-manager-fullstack
```

---

### 2. Setup Backend

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

---

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## 🔒 Environment Variables

Never upload your `.env` file to GitHub.

Required backend variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Make sure `.env` is included in `.gitignore`.

---

## 📸 Application Flow

### 1. Register

Users can create a new account using their name, email, and password.

### 2. Login

Registered users can securely log in.

### 3. Dashboard

After successful authentication, users are redirected to the protected dashboard.

### 4. Manage Posts

Authenticated users can:

- Create posts
- View posts
- Edit posts
- Delete posts

---

## 🧪 API Testing

The backend API can be tested using tools such as:

- Postman
- Thunder Client
- Browser
- Axios

Example:

```http
GET /api/posts
```

with the authentication token in the request headers.

---

## 🌐 Deployment

### Frontend

The React frontend is deployed using **Vercel**.

### Backend

The Node.js/Express backend is deployed using **Render**.

### Database

The application uses **MongoDB Atlas** for cloud database storage.

---

## 🔮 Future Improvements

- User-specific post ownership
- Search and filtering
- Pagination
- Post categories
- Image uploads
- Profile management
- Refresh tokens
- Improved UI/UX
- Loading skeletons
- Form validation

---

## 👨‍💻 Author

**Sarvagya Shukla**

Full Stack Developer

---

## 📄 License

This project is created for learning and internship purposes.

```

```
