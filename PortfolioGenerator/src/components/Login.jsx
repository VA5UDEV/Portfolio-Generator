import { useState } from "react";
import { Input, Button, Label } from "./index";
import { useNavigate, Link } from "react-router-dom";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/authslice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await authService.login(formData);
      if (user) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(login(currentUser));
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-3xl flex flex-col md:flex-row items-center justify-center gap-8 bg-white rounded-lg shadow-md p-6">
        {/* Left - Form */}
        <div className="w-full max-w-sm text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900">Log In</h2>
          <p className="text-gray-600 mt-1">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>

          {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
                className="w-full border-b border-gray-300 px-2 py-3 focus:outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="w-full border-b border-gray-300 px-2 py-3 focus:outline-none focus:border-gray-500"
              />
            </div>

            <div className="flex justify-between">
              <Link
                to="/forgot"
                className="text-blue-600 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 hover:bg-blue-700 mt-2 rounded-md transition duration-300"
            >
              Continue with Email →
            </Button>
          </form>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-64 bg-gray-300"></div>
        <div className="md:hidden flex items-center w-full my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Right - Social Logins */}
        <div className="w-full max-w-sm space-y-3">
          <Button
            onClick={() => authService.loginWithGoogle()}
            className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center justify-center py-3 rounded-md transition duration-300"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </Button>
          <Button className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center justify-center py-3 rounded-md transition duration-300">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
              alt="Facebook"
              className="w-5 h-5 mr-2"
            />
            Continue with Facebook
          </Button>
          <Button className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center justify-center py-3 rounded-md transition duration-300">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              alt="Apple"
              className="w-5 h-5 mr-2"
            />
            Continue with Apple
          </Button>
        </div>
      </div>
    </div>
  );
}
