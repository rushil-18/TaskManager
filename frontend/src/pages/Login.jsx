import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      await login(form.identifier, form.password);
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="auth-page">
      <h1>Login</h1>

      <form className="auth-page" onSubmit={handleSubmit}>
        <input
          name="identifier"
          value={form.identifier}
          onChange={handleChange}
          placeholder="Username or Email"
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
        />

        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}
      {error && <p className="auth-page">{error}</p>}
    </div>
  );
}

export default Login;