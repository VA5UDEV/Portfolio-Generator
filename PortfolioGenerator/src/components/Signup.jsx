import { useState } from "react";
import { Input, Button, Label } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login } from "../store/authslice";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");

  const signUp = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(login(currentUser));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-3xl flex flex-col md:flex-row items-center justify-center gap-8 bg-white rounded-lg shadow-md p-6 mt-6">
        {/* Left - Form */}
        <div className="w-full max-w-sm text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900">Sign Up</h2>
          <p className="text-gray-600 mt-1">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log In
            </Link>
          </p>

          {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}

          <form onSubmit={handleSubmit(signUp)} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
              <Input
                id="email"
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email"
                className="w-full border-b border-gray-300 px-2 py-3 focus:outline-none focus:border-gray-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmEmail" className="sr-only">
                Confirm Email
              </Label>
              <Input
                id="confirmEmail"
                {...register("confirmEmail", {
                  required: "Confirm Email is required",
                  validate: (value) =>
                    value === watch("email") || "Emails do not match",
                })}
                type="email"
                placeholder="Confirm Email"
                className="w-full border-b border-gray-300 px-2 py-3 focus:outline-none focus:border-gray-500"
              />
              {errors.confirmEmail && (
                <p className="text-red-500 text-sm">
                  {errors.confirmEmail.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <Input
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  maxLength: {
                    value: 265,
                    message: "Password must be under 265 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain at least one letter and one number",
                  },
                })}
                type="password"
                placeholder="Password"
                className="w-full border-b border-gray-300 px-2 py-3 focus:outline-none focus:border-gray-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                type="password"
                placeholder="Confirm Password"
                className="w-full border-b border-gray-300 px-2 py-3 focus:outline-none focus:border-gray-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 hover:bg-blue-700 mt-2 rounded-md transition duration-300"
            >
              Continue with Email →
            </Button>
          </form>
        </div>

        {/* Divider - exactly matching Login component */}
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
