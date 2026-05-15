import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login, authLoading, error, setError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await login(form);
      navigate("/set-location");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-pink-600 mb-2">Welcome back</h1>
        <p className="text-gray-500 mb-6">Login to continue finding PGs near you.</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Email</span>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-200 p-2.5 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200"
              type="email"
              placeholder="Enter your email"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Password</span>
            <input
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-200 p-2.5 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200"
              type="password"
              placeholder="Enter your password"
            />
          </label>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full bg-pink-500 text-white rounded-lg py-3 font-semibold hover:bg-pink-600 hover:shadow-lg transition-all duration-200"
            disabled={authLoading}
          >
            {authLoading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-500">
          New here?{' '}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-pink-500 font-semibold hover:underline"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
