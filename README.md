# 📸 Photo Gallery Web App

A modern, high-performance photo gallery application built with React, Vite, and Node.js. This project features a full-stack architecture with a MongoDB backend for persistent favourites, optimized with advanced React hooks for a buttery-smooth 2026 UI experience.

---

## ✨ Key Features

- **Instant Search:** Filter photos in real-time without page reloads.
- **Persistent Favourites:** Save your favorite photos directly to a MongoDB database.
- **Optimistic UI:** Instant feedback when favoriting items, with background synchronization.
- **Avant-Garde Design:** A sleek, modern brutalist aesthetic with liquid glassmorphic elements.
- **Performance Optimized:** Leverages `useMemo` and `useCallback` to ensure maximum responsiveness.
- **Custom Hooks:** Clean data fetching logic decoupled from UI components.

---

## 🚀 Tech Stack

### Frontend
- **React 18** (Functional Components, Hooks)
- **Vite** (Next-generation frontend tooling)
- **Tailwind CSS** (Utility-first styling)
- **State Management:** `useReducer` for complex state transitions.

### Backend
- **Node.js & Express**
- **MongoDB & Mongoose** (Data persistence)
- **CORS** (Cross-Origin Resource Sharing)
- **dotenv** (Environment variable management)

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or a cloud instance)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "New gallery task"
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/photo-gallery
```
Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
The app will be available at `http://localhost:5173`.

---

## 📁 Project Structure

```text
├── backend/
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API endpoints
│   ├── index.js       # Express server entry point
│   └── .env           # Backend configuration
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── hooks/      # Custom React hooks (useFetchPhotos)
│   │   ├── reducers/   # useReducer logic
│   │   └── App.jsx      # Main application entry
│   └── index.html
└── README.md          # Project documentation
```

---


