import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const API_URL=import.meta.env.VITE_API_URL;
export function useSocket() {
  const [socket] = useState(() => io(API_URL));
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.on("sync:tasks", (data) => {
      console.log("SYNC RECEIVED:",data);
      setTasks(data);
      setLoading(false);
    });

    socket.on("task:created", (task) => {
      setTasks(prev => [...prev, task]);
    });

    socket.on("task:deleted", (id) => {
      setTasks(prev => prev.filter(t => t.id !== id));
    });

    return () => {
      socket.off("sync:tasks");
      socket.off("task:created");
      socket.off("task:deleted");
    };
  }, [socket]);

  return { socket, tasks, loading };
}
