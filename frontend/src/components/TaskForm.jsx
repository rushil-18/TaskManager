import { useState } from "react";

function TaskForm({
  onSubmit,
  editingTask,
  onCancel,
}) {
  const [form, setForm] = useState({
    content: editingTask?.content || "",
    priority: editingTask?.priority || "Medium",
    due_date: editingTask?.due_date
      ? editingTask.due_date.slice(0, 16)
      : "",
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await onSubmit({
      content: form.content,
      priority: form.priority,
      due_date: form.due_date || null,
    });

    if (!editingTask) {
      setForm({
        content: "",
        priority: "Medium",
        due_date: "",
      });
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Enter a task"
      />

      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <input
        name="due_date"
        type="datetime-local"
        value={form.due_date}
        onChange={handleChange}
      />

      <button type="submit">
        {editingTask ? "Update Task" : "Add Task"}
      </button>

      {editingTask && (
        <button
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default TaskForm;