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
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-3xl flex items-center justify-between">
        {/* Left - Form Section */}
        <div className="w-1/2 pr-8">
          <h1 className="text-3xl font-semibold text-gray-900">Sign Up</h1>
          <p className="text-gray-600 mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log In
            </Link>
          </p>

          {error && <p className="text-red-600 mt-4">{error}</p>}

          <form onSubmit={handleSubmit(signUp)} className="mt-6 space-y-4">
            <div>
              <Label></Label>
              <Input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label></Label>
              <Input
                {...register("confirmEmail", {
                  required: "Confirm Email is required",
                  validate: (value) =>
                    value === watch("email") || "Emails do not match",
                })}
                type="email"
                placeholder="Confirm Email"
              />
              {errors.confirmEmail && (
                <p className="text-red-500 text-sm">
                  {errors.confirmEmail.message}
                </p>
              )}
            </div>

            <div>
              <Label></Label>
              <Input
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
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Label></Label>
              <Input
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                type="password"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Updated Button with Hover Effect */}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 hover:bg-blue-700 transition duration-300"
            >
              Continue with Email →
            </Button>
          </form>
        </div>

        {/* Vertical Divider */}
        <div className="w-px h-64 bg-gray-300"></div>

        {/* Right - Social Login Section */}
        <div className="w-1/2 flex flex-col items-center">
          <div className="w-full space-y-4 pl-8">
            <Button className="w-full flex items-center justify-center border bg-white text-gray-900 shadow-sm hover:bg-gray-100 transition duration-300">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Continue with Google
            </Button>
            <Button className="w-full flex items-center justify-center border bg-white text-gray-900 shadow-sm hover:bg-gray-100 transition duration-300">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                alt="Facebook"
                className="w-5 h-5 mr-2"
              />
              Continue with Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
