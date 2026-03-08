import React from "react";
import { updateCustomerProfile } from "@/services/customer.service.js";
import { updateCustomerProfileSchema } from "@/validations/customerSchema";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getMe } from "@/services/customer.service.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";

// Update Customer Profile
const ProfileC = () => {
  const navigate = useNavigate();
  const {refreshUser} = useAuth()
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const getCustomer = async () => {
      try {
        let res = await getMe();
        setUser(res.data.data);
      } catch (error) {
        toast("Error fetching user data. Please try again later.", {
          type: "error",
        });
      }
    };
    getCustomer();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(updateCustomerProfileSchema),
  });

  const onSubmit = async (data) => {
    try {
      await updateCustomerProfile(data);
      await refreshUser();
      toast.success("Customer Profile Updated Successfully.");
      navigate("/customer/dashboard");
    } catch (error) {
      toast.error("Error while updating Profile");
      console.log("Customer Profile Update Error:", error);
    }
  };

  useEffect(() => {
    if(user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        city: user.city || "",
      });
    }
  },[user,reset])

  return (
  <div className="min-h-screen bg-stone-50 flex items-start justify-center p-6">
    <div className="w-full max-w-md bg-white border border-stone-100 rounded-lg shadow-sm p-6">

      <h2 className="text-xl font-semibold text-stone-800 mb-6">
        Update Profile
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-stone-600">Name</label>
          <input
            {...register("name")}
            type="text"
            placeholder="Enter your name"
            className="border border-stone-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300"
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-stone-600">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            className="border border-stone-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300"
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* City */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-stone-600">City</label>
          <input
            {...register("city")}
            type="text"
            placeholder="Enter your city"
            className="border border-stone-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300"
          />
          {errors.city && (
            <p className="text-xs text-red-500">{errors.city.message}</p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-3 bg-stone-800 text-white text-sm py-2.5 rounded-md hover:bg-stone-900 transition disabled:opacity-50"
        >
          {isSubmitting ? "Updating..." : "Update Profile"}
        </button>

      </form>
    </div>
  </div>
);
};

export default ProfileC;
