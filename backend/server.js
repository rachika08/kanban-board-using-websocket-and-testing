const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// In-memory task store
let tasks = [];

// DEBUG: check backend state every 3 sec
setInterval(() => {
  console.log("Tasks:", tasks);
}, 3000);

io.on("connection", (socket) => {
  console.log("🔌 Client connected");

  // Send existing tasks to new client
  socket.emit("sync:tasks", tasks);

  // Create task
  socket.on("task:create", (task) => {
    tasks.push(task);
    io.emit("sync:tasks", tasks);
  });

  //Move task
  socket.on("task:move", ({ id, status }) => {
    tasks = tasks.map(t =>
      t.id === id ? { ...t, status } : t
    );
    io.emit("sync:tasks", tasks);
  });

  //update task
  socket.on("task:update", (updatedTask) => {
    tasks = tasks.map(t =>
      t.id === updatedTask.id ? { ...t, ...updatedTask } : t
    );

    io.emit("sync:tasks", tasks);
  });

  // Delete task
  socket.on("task:delete", (id) => {
    tasks = tasks.filter(t => t.id !== id);
    io.emit("task:deleted", id);
  });
  
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
