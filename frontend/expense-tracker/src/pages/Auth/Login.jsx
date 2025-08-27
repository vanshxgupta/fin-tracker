import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/inputs/Input';
import { validEmail } from '../../utils/helper';
import axiosInstance from "../../utils/axiosInstance.js"
import { API_PATH } from '../../utils/apiPath.js';
import { UserContext } from '../../context/userContext.jsx';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle Login Form Submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        email,
        password
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError(`${error.message}, please try again later`);
      }
    }
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="w-full max-w-md">
          <h3 className="text-2xl font-bold text-center text-black mb-2">
            Welcome Back
          </h3>
          <p className="text-sm text-center text-slate-600 mb-6">
            Enter your details to login
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              type="text"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="Enter your email"
            />

            <Input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Enter your password"
            />

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-xl transition duration-200"
            >
              LOGIN
            </button>

            <p className="text-sm text-center text-slate-800">
              Don’t have an account?{" "}
              <Link
                className="ml-1 font-medium text-purple-600 hover:underline"
                to="/signUp"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Login
