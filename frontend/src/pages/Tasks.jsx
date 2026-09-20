import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchTasks() {
    try {
      const data = await apiFetch("/tasks");
      setTasks(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleSubmit(formData) {
    setError("");

    try {
      if (editingTask) {
        const updatedTask = await apiFetch(
          `/tasks/${editingTask.task_id}`,
          {
            method: "PATCH",
            body: JSON.stringify(formData),
          }
        );

        setTasks(
          tasks.map((task) =>
            task.task_id === editingTask.task_id
              ? updatedTask
              : task
          )
        );

        setEditingTask(null);
      } else {
        const newTask = await apiFetch("/tasks", {
          method: "POST",
          body: JSON.stringify(formData),
        });

        setTasks([...tasks, newTask]);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleComplete(taskId, completed) {
    try {
      const updatedTask = await apiFetch(
        `/tasks/${taskId}/complete`,
        {
          method: "PATCH",
          body: JSON.stringify({
            completed: !completed,
          }),
        }
      );

      setTasks(
        tasks.map((task) =>
          task.task_id === taskId
            ? updatedTask
            : task
        )
      );
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleDelete(taskId) {
    try {
      await apiFetch(`/tasks/${taskId}`, {
        method: "DELETE",
      });

      setTasks(
        tasks.filter(
          (task) => task.task_id !== taskId
        )
      );
    } catch (error) {
      setError(error.message);
    }
  }

  function handleEdit(task) {
    setEditingTask(task);
  }

  function handleCancel() {
    setEditingTask(null);
  }

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div className="page">
      <h1>Tasks</h1>

      {error && <p>{error}</p>}

      <TaskForm
        onSubmit={handleSubmit}
        editingTask={editingTask}
        onCancel={handleCancel}
      />

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.task_id}
            task={task}
            onComplete={handleComplete}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}

export default Tasks;