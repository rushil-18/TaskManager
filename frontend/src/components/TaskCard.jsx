function TaskCard({
  task,
  onComplete,
  onEdit,
  onDelete,
}) {
  return (
    <div className="task-card">
      <h3>{task.content}</h3>

      <p>Priority: {task.priority}</p>

      <p>
        Status:{" "}
        {task.completed
          ? "Completed"
          : "Pending"}
      </p>

      {task.due_date && (
        <p>
          Due:{" "}
          {new Date(
            task.due_date
          ).toLocaleString()}
        </p>
      )}

      <button
        onClick={() =>
          onComplete(
            task.task_id,
            task.completed
          )
        }
      >
        {task.completed
          ? "Mark Pending"
          : "Complete"}
      </button>

      <button
        onClick={() => onEdit(task)}
      >
        Edit
      </button>

      <button
        onClick={() =>
          onDelete(task.task_id)
        }
      >
        Delete
      </button>
    </div>
  );
}

export default TaskCard;