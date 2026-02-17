📌Project Overview

This project involves building a real-time Kanban board where users can add, update, delete, move tasks between columns, upload attachments, assign priority & category, and visualize progress.

Live Frontend: https://kanban-board-using-websocket-and-te.vercel.app/

Live Backend:  https://kanban-board-using-websocket-and-testing.onrender.com

## 📂 Project Structure

```
kanban-board-using-websocket-and-testing/
│
├── backend/
│   ├── server.js              # Express + Socket.IO server
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Kanban.jsx
│   │   │   ├── ProgressChart.jsx
│   │   │   └── TaskCard.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useSocket.js
│   │   │
│   │   ├── __tests__/
│   │   └── App.jsx
│   │
│   ├── tests/
│   │   ├── dropdown.spec.js
│   │   ├── file-upload.spec.js
│   │   └── kanban.spec.js
│   │
│   └── package.json
│
└── README.md
```

🔄 Real-Time Architecture

1. Client connects via Socket.IO
2. Backend maintains in-memory task store
3. Any task action (create, move, update, delete)
4. Backend broadcasts updated state to all clients
5. UI updates instantly

🔹 Features Implemented

✅ Create new tasks

✏️ Update task details

🔄 Drag & drop tasks between columns

🗑️ Delete tasks

⚡ Real-time sync across multiple users

📊 Live task updates via WebSockets




🎨 Frontend

The frontend is built using ⚛️ React with ⚡ Vite for fast development and optimized builds.
It follows a modular component-based architecture and uses a custom hook for real-time communication via 🔌 Socket.IO.
The UI supports dynamic task creation, updates, drag-and-drop movement, and instant synchronization across multiple clients.




🖥️ Backend

The backend is built using 🟢 Node.js with 🚂 Express to create a lightweight server.
Real-time communication is handled via 🔌 Socket.IO, enabling instant task synchronization across connected clients.
It maintains an in-memory task store and broadcasts updates (create, move, update, delete) to ensure consistent state across all users.




🧪 Testing

This project includes Unit Testing,Integration Testing and End-to-End (E2E) Testing.

    🔹 Unit Testing and Integration Testing (Vitest)
    Unit tests are written using Vitest and located inside: frontend/src/__tests__/
    To run test: 
    cd frontend
    npm run test
    🔹 End-to-End Testing (Playwright)
    E2E tests are written using Playwright and located inside: frontend/tests/
    To run test:
    cd frontend
    npx playwright test
Basic unit tests implemented. E2E testing setup configured with Playwright. Further test coverage improvements planned.



📌 This project demonstrates:
- Real-time communication using WebSockets
- Component-based React architecture
- State synchronization across clients
- Deployment using Vercel and Render
- Multi-level testing strategy










