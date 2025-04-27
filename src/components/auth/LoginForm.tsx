import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { UserRound, Lock, LogIn } from "lucide-react";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    const success = login(username, password);

    if (!success) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
        <p className="mt-2 text-sm text-gray-600">
          Sign in to access your weather dashboard
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <UserRound className="h-5 w-5 text-sky-500" />
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
          </div>
          <div className="mt-1">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Lock className="h-5 w-5 text-sky-500" />
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
          </div>
          <div className="mt-1">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
              placeholder="Enter your password"
            />
          </div>
        </div>

        {error && (
          <div className="p-2 text-sm text-red-500 bg-red-50 rounded border border-red-200">
            {error}
          </div>
        )}

        <div>
          <button
            type="submit"
            className="w-full flex justify-center items-center space-x-2 px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors"
          >
            <LogIn className="h-5 w-5" />
            <span>Sign In</span>
          </button>
        </div>
      </form>

      <div className="text-center text-sm space-y-2">
        <p className="text-gray-600 font-medium">Test Accounts:</p>
        <div className="space-y-1">
          <p className="text-gray-600">
            Admin: <span className="font-medium">admin@example.com</span> /{" "}
            <span className="font-medium">admin123</span>
          </p>
          <p className="text-gray-600">
            Alt Admin: <span className="font-medium">manager</span> /{" "}
            <span className="font-medium">manager123</span>
          </p>
          <p className="text-gray-600">
            Users: <span className="font-medium">user</span>,{" "}
            <span className="font-medium">john</span>,{" "}
            <span className="font-medium">sarah</span>
          </p>
          <p className="text-gray-600">
            (All user passwords: username + "123")
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
