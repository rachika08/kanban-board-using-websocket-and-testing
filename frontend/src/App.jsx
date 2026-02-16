import { useSocket } from "./hooks/useSocket";
import KanbanBoard from "./components/KanbanBoard";
import ProgressChart from "./components/ProgressChart";

import './App.css';

function App() {
  const { socket, tasks, loading } = useSocket();

  if (loading) return <h2>Loading...</h2>;

  function addTask(task) {
    socket.emit("task:create", task);
  }


  function moveTask(id, status) {
    socket.emit("task:move", { id, status });
  }

  function updateTask(updatedTask) {
    socket.emit("task:update", updatedTask);
  }


  function deleteTask(id) {
    socket.emit("task:delete", id);
  }

  return (
    <>
    <KanbanBoard
      tasks={tasks}
      onAddTask={addTask}
      onDeleteTask={deleteTask}
      onMoveTask={moveTask}
      onUpdateTask={updateTask}
    />
    <ProgressChart tasks={tasks}/>
    </>
  );
}

export default App;
