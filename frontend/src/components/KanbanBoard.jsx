import { v4 as uuid } from "uuid";
import { useState } from "react";
import Select from "react-select";
import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd";

const ITEM_TYPE = "TASK";

const COLUMNS = ["To Do", "In Progress", "Done"];
const priorityOptions = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" }
];

const categoryOptions = [
  { value: "Bug", label: "Bug" },
  { value: "Feature", label: "Feature" },
  { value: "Enhancement", label: "Enhancement" }
];


export default function KanbanBoard({ tasks, onAddTask, onDeleteTask, onMoveTask,onUpdateTask }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState(priorityOptions[1]);
  const [newCategory, setNewCategory] = useState(categoryOptions[0]);


  return (
    <>
      <h1 className="mainhead">KANBAN BOARD</h1>
      <div className="task-form">

        <input
          data-testid='task-input'
          placeholder="Task title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <div className="component">
        <div className="select-box" data-testid="priority-select">
          <Select
            menuPortalTarget={document.body}
            menuPosition="fixed"
            styles={{
              menuPortal: base => ({ ...base, zIndex: 9999 })
            }}
            options={priorityOptions}
            value={newPriority}
            onChange={setNewPriority}
            placeholder="Select Priority"
          />
        </div>

        <div className="select-box" data-testid="category-select">
          <Select
            menuPortalTarget={document.body}
            menuPosition="fixed"
            styles={{
              menuPortal: base => ({ ...base, zIndex: 9999 })
            }}
            options={categoryOptions}
            value={newCategory}
            onChange={setNewCategory}
            placeholder="Select Category"
          />
        </div>

        <button
          data-testid="add-task-btn"
          onClick={() => {
            if (!newTitle.trim()) return;

            onAddTask({
              id: Date.now(),
              title: newTitle,
              status: "To Do",
              priority: newPriority.value,
              category: newCategory.value
            });

            setNewTitle("");
            setNewPriority(priorityOptions[1]);
            setNewCategory(categoryOptions[0]);
          }}
        >
          Add Task
        </button>
        </div>
      </div>


      <div className="board">
        {COLUMNS.map(col => {
          const [{ isOver }, drop] = useDrop(() => ({
            accept: ITEM_TYPE,
            drop: (item) => {
              if (item.status !== col) {
                onMoveTask(item.id, col);
              }
            },
            collect: (monitor) => ({
              isOver: monitor.isOver(),
            }),
          }));

          return (
            <div
              key={col}
              ref={drop}
              data-testid={`${col}-column`}
              className="column"
              style={{
                backgroundColor: isOver ? "#f0f8ff" : "",
                transition: "background 0.2s ease"
              }}
            >
              <h2>{col}</h2>

              {tasks
                .filter(task => task.status === col)
                .map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDeleteTask={onDeleteTask}
                    onMoveTask={onMoveTask}
                    onUpdateTask={onUpdateTask}
                  />
                ))}
            </div>
          );
        })}

      </div>
    </>
  );
}
