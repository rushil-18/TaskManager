import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

function Progress() {
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState("");

  async function fetchProgress() {
    try {
      const data = await apiFetch("/progress");
      setProgress(data);
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchProgress();
  }, []);

  if (error) {
    return (
        <div className="page">
            <p>Error: {error}</p>
        </div>
    );
  }
         

  if (!progress) {
    return (
        <div className="page">
            <p>Loading...</p>
        </div>
    );
  }

  return (
  <div className="page">
    <h1>Progress</h1>

    <div className="progress-card">
      <p>Total Tasks: {progress.total_tasks}</p>
      <p>Completed: {progress.completed_tasks}</p>
      <p>Pending: {progress.pending_tasks}</p>
      <p>
        Completion: {progress.completion_percentage}%
      </p>
    </div>
  </div>
);
}

export default Progress;