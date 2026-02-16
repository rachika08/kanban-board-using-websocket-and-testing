import { useState } from "react";
import { useDrag } from "react-dnd";

const ITEM_TYPE = "TASK";


export default function TaskCard({
  task,
  onDeleteTask,
  onMoveTask,
  onUpdateTask
}) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState(task.title);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileURL = URL.createObjectURL(file);

    onUpdateTask({
      ...task,
      attachment: {
        name: file.name,
        url: fileURL,
        type: file.type
      }
    });
  };

  return (
    <div 
      ref={drag}
      data-testid={`task-${task.id}`}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move"
      }} className="task">

      {/* Title Section */}
      <div className="task-top">
        {editingId === task.id ? (
          <input
          
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        ) : (
          <span className="task-title">{task.title}</span>
        )}

        <button aria-label="delete"  data-testid={`delete-${task.id}`} onClick={() => onDeleteTask(task.id)}>❌</button>
      </div>

      {/* Meta */}
      <div className="task-meta">
        <span className={`priority ${task.priority?.toLowerCase()}`}>
          {task.priority}
        </span>
        <span className="category">{task.category}</span>
      </div>

      {/* Attachment */}
      <div className="task-attachment">
        {editingId==task.id && (
        <input
          data-testid="file-input"
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileUpload}
        />)}

        {task.attachment && (
          <div className="attachment-preview">
            {task.attachment.type.startsWith("image") ? (
              <img
                src={task.attachment.url}
                alt="attachment"
                className="attachment-image"
              />
            ) : (
              <a
                href={task.attachment.url}
                target="_blank"
                rel="noreferrer"
              >
                📄 {task.attachment.name}
              </a>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="task-actions">
        {editingId === task.id ? (
          <button
            onClick={() => {
              onUpdateTask({ ...task, title: editText });
              setEditingId(null);
            }}
          >
            Save
          </button>
        ) : (
          <button aria-label="edit" data-testid={`edit-${task.id}`}  onClick={() => setEditingId(task.id)}>
            Edit
          </button>
        )}

        {task.status === "To Do" && (
          <button onClick={() => onMoveTask(task.id, "In Progress")}>
            In Progress
          </button>
        )}

        {task.status === "In Progress" && (
          <button onClick={() => onMoveTask(task.id, "Done")}>
            Done
          </button>
        )}
      </div>

    </div>
  );
}
