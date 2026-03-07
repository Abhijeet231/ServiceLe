import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/validations/authSchema.js";
import { login, register as registerUser } from "@/services/auth.service.js";
import { User, Mail, Lock, MapPin } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmitt = async (data) => {
    try {
      const result = await registerUser(data);

      // Immediate login flow 
      await login(data);
      
      toast.success("User Registered Successfully.");
      console.log("Registered User:", result.data);
      navigate("/customer/dashboard");

    } catch (error) {
      toast.error("User registration Error!");
      console.log("User Registration Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 bg-gray-50">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="font-bold text-4xl bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
            Create Account
          </h2>

          <p className="text-gray-600">Join us today</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-amber-200 p-8 hover:shadow-2xl transition-all duration-300">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmitt)}>

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2"
              >
                <User size={16} className="text-amber-600" />
                Name
              </label>

              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 bg-amber-50/30 shadow-sm focus:outline-none focus:border-amber-500"
                placeholder="Enter Your Name"
                {...register("name")}
              />

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

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
                className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 bg-amber-50/30 shadow-sm focus:outline-none focus:border-amber-500"
                placeholder="Enter your email"
                {...register("email")}
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
                className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 bg-amber-50/30 shadow-sm focus:outline-none focus:border-amber-500"
                placeholder="Enter password"
                {...register("password")}
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2"
              >
                <MapPin size={16} className="text-amber-600" />
                City
              </label>

              <input
                type="text"
                id="city"
                className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 bg-amber-50/30 shadow-sm focus:outline-none focus:border-amber-500"
                placeholder="Enter your city"
                {...register("city")}
              />

              {errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-linear-to-r from-amber-600 to-orange-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-amber-600 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;