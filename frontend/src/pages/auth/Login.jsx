import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validations/authSchema.js";
import { useAuth } from "@/context/AuthContext.jsx";

import { Mail, Lock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const {login} = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await login(data);
      toast.success("Login successful!");
      console.log("Logged in user:", result.data);

      navigate("/customer/dashboard");
    } catch (error) {
      toast.error("Invalid email or password");
      console.log("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 bg-gray-50">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="font-bold text-4xl bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-600">
            Login to continue using ServiceLE
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-amber-200 p-8 hover:shadow-2xl transition-all duration-300">

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2"
              >
                <Mail size={16} className="text-amber-600" />
                Email
              </label>

              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register("email")}
                className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 bg-amber-50/30 shadow-sm focus:outline-none focus:border-amber-500"
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2"
              >
                <Lock size={16} className="text-amber-600" />
                Password
              </label>

              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register("password")}
                className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 bg-amber-50/30 shadow-sm focus:outline-none focus:border-amber-500"
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-linear-to-r from-amber-600 to-orange-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-amber-600 font-semibold hover:underline"
              >
                Create one
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;