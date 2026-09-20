import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function checkAuth() {
    try {
      const currentUser = await apiFetch("/auth/me");
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(identifier, password) {
    const loggedInUser = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    setUser(loggedInUser);
  }

  async function logout() {
    await apiFetch("/auth/logout", {
      method: "POST",
    });

    setUser(null);
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}