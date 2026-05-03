# Cyril Ayisu — Portfolio Web Application

A production-ready full-stack portfolio built with React, Node.js, Express, and MongoDB.

---

## 🚀 Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
# Runs on http://localhost:5000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### 3. Create Admin Account (first time only)
```bash
curl -X POST http://localhost:5000/api/auth/setup \
  -H "Content-Type: application/json" \
  -d '{"name":"Cyril Ayisu","email":"your@email.com","password":"YourPassword123"}'
```

Then visit: `http://localhost:5173/admin/login`

---

## 📁 Structure
```
portfolio-app/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/       # JWT auth middleware
│   ├── server.js        # Express entry point
│   └── .env.example     # Environment variables template
└── frontend/
    └── src/
        ├── components/  # UI + Section components
        ├── pages/       # Home, Admin pages
        ├── context/     # Auth context
        └── utils/       # API helpers
```

## 🌐 Deployment
- **Frontend** → Vercel (connect GitHub repo, set VITE_API_URL env var)
- **Backend** → Render (set all .env variables in dashboard)
- **Database** → MongoDB Atlas (free tier works)

## 🔑 Environment Variables (backend/.env)
```
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_long_random_secret
ADMIN_EMAIL=your@email.com
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
CLIENT_URL=http://localhost:5173
```
