# 🚀 Real-time Code Editor

## 🔗 Live Demo

👉 [Click here to use the app](https://code-editor-2yxi.onrender.com/)

---

## 📌 Description

A collaborative platform that allows multiple users to write and edit code together in real-time. Any changes made by one user are instantly reflected across all connected clients, making it ideal for coding interviews, pair programming, and learning sessions.

---

## ✨ Features

- 🏠 **Room-based Collaboration**
  Users can create or join unique rooms using a Room ID.

- ⚡ **Real-time Synchronization**
  Code updates are instantly shared with all users using WebSockets.

- 👥 **User Presence**
  Displays all connected users in a room with unique avatars.

- 🔗 **Room Management**
  - Copy Room ID
  - Leave room functionality

- 🔔 **Notifications**
  Toast notifications when users join or leave the room.

---

## 🛠️ Tech Stack

**Frontend:**

- React.js
- React Router
- CodeMirror

**Backend:**

- Node.js
- Express.js

**Real-time Communication:**

- Socket.io

---

## ⚙️ Getting Started (Local Setup)

### 1. Clone the repository

```bash
git clone https://github.com/shubhangickore/Code_Editor.git
cd Code_Editor/realtime-editor
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the application

Start backend:

```bash
npm run server:dev
```

Start frontend:

```bash
npm run start:front
```

---

## 🌐 Deployment

This project is deployed on Render, where both frontend and backend are served together.

---

## 📚 Learning Source

This project was built by following a tutorial by **Coder's Gyan** and further customized and deployed independently.

---

## 💡 Future Improvements

- Add authentication
- Add code persistence (database)
- Support multiple programming languages
- Improve UI/UX

---
