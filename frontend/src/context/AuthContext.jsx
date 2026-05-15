import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    api.get("/user/me")
      .then((response) => {
        setUser(response.data.user);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const register = async (payload) => {
    setAuthLoading(true);
    setError("");
    try {
      const response = await api.post("/auth/register", payload);
      return response.data.user;
    } catch (err) {
      const message = err.response?.data?.error || err.message || "Registration failed.";
      setError(message);
      throw new Error(message);
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async (payload) => {
    setAuthLoading(true);
    setError("");
    try {
      const response = await api.post("/auth/login", payload);
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      return response.data.user;
    } catch (err) {
      const message = err.response?.data?.error || err.message || "Login failed.";
      setError(message);
      throw new Error(message);
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const saveLocation = async (locationPayload) => {
    setAuthLoading(true);
    setError("");
    try {
      const response = await api.post("/user/location", locationPayload);
      setUser(response.data.user);
      return response.data.user;
    } catch (err) {
      const message = err.response?.data?.error || err.message || "Unable to save location.";
      setError(message);
      throw new Error(message);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authLoading,
        error,
        setError,
        register,
        login,
        logout,
        saveLocation
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
