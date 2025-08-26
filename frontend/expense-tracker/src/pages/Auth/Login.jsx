import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    setError(null);
    // Perform login logic here (API call)
    // On success: navigate("/dashboard")
  };

  return (
    <AuthLayout>
      {/* Center login card */}
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-lg">
          <h3 className="text-3xl font-bold text-gray-900 text-center">
            Welcome Back
          </h3>
          <p className="text-sm text-gray-600 mt-2 mb-8 text-center">
            Please enter your credentials to access your account
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <Input
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="vansh@gmail.com"
            />

            <Input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="••••••••"
            />

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white bg-purple-700 hover:bg-purple-600 transition-colors duration-200 rounded-xl"
            >
              LOGIN
            </button>

            <p className="text-sm text-gray-700 text-center mt-4">
              Don’t have an account?
              <Link
                className="ml-1 font-medium text-purple-700 hover:underline"
                to="/signUp"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
