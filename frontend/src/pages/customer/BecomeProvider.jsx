import React from 'react'
import { createProviderProfileSchema } from '@/validations/providerSchema';
import { createproviderProfile } from '@/services/provider.service';
import { getAllCategory } from '@/services/category.service';
import { getAllServiceByCategory } from '@/services/service.service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';

const BecomeProvider = () => {

  const navigate = useNavigate();
  const { user } = useAuth();

  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategory();
        setCategories(res?.data?.data)
        console.log("Categories: ", res.data.data)
      } catch (error) {
        toast.error("Failed to load categories")
        console.log("Error while fetching categories", error)
      }
    }
    fetchCategories()
  }, [])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProviderProfileSchema),
  });

  const categoryId = watch("categoryId")

  useEffect(() => {
    if (!categoryId) return;

    const fetchServices = async () => {
      try {
        const res = await getAllServiceByCategory(categoryId);
        setServices(res?.data?.data);
      } catch (error) {
        toast.error("Failed to load services")
      }
    }
    fetchServices();
  }, [categoryId])

  const onSubmit = async (data) => {
    try {
      await createproviderProfile(data);
      toast.success("Provider profile created!");
      navigate("/provider/dashboard");
    } catch (err) {
      toast.error("Something went wrong");
      console.log("Error while submiting hte form", err)
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4 sm:p-8">

      <div className="w-full max-w-xl">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md border border-stone-100 overflow-hidden">

          {/* Amber top accent */}
          <div className="h-1 w-full bg-linear-to-r from-amber-300 via-amber-400 to-orange-300" />

          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-amber-500 stroke-2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase">New Opportunity</p>
              </div>
              <h1 className="text-2xl font-semibold text-stone-800 mt-2">
                Become a Service Provider
              </h1>
              <p className="text-sm text-stone-400 mt-1">
                Tell us about your skills and services.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

              {/* ── Category ── */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-stone-700 mb-1.5">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-amber-500 stroke-2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                  Category
                </label>
                <div className="relative">
                  <select
                    {...register("categoryId")}
                    className={`w-full appearance-none bg-stone-50 border rounded-xl px-4 py-2.5 pr-10 text-sm text-stone-700 transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent focus:bg-white
                      hover:border-stone-300 cursor-pointer
                      ${errors.categoryId ? "border-red-300 bg-red-50/50" : "border-stone-200"}`}
                  >
                    <option value="">Select a category…</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <svg viewBox="0 0 24 24" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 stroke-stone-400 fill-none stroke-2 pointer-events-none" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
                {errors.categoryId && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.categoryId.message}</p>
                )}
              </div>

              {/* ── Services ── */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-stone-700 mb-1.5">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-amber-500 stroke-2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  Services
                </label>

                <div
                  className={`rounded-xl border p-4 transition-all duration-200 min-h-20
                    ${!categoryId
                      ? "bg-stone-50 border-stone-100"
                      : errors.serviceIds
                        ? "border-red-200 bg-red-50/20"
                        : "border-stone-200 bg-white"
                    }`}
                >
                  {!categoryId ? (
                    <div className="flex items-center justify-center h-12">
                      <p className="text-xs text-stone-400 text-center">
                        Select a category first to see available services
                      </p>
                    </div>
                  ) : services.length === 0 ? (
                    <div className="flex items-center justify-center gap-2 h-12">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-amber-400 fill-none stroke-2 animate-spin" strokeLinecap="round">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      <span className="text-xs text-stone-400">Loading services…</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {services.map((svc) => (
                        <label
                          key={svc._id}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-stone-100 bg-stone-50
                            hover:border-amber-200 hover:bg-amber-50/50 cursor-pointer transition-all duration-150 group"
                        >
                          <input
                            type="checkbox"
                            value={svc._id}
                            {...register("serviceIds")}
                            className="w-4 h-4 rounded border-stone-300 text-amber-500 accent-amber-400 cursor-pointer"
                          />
                          <span className="text-sm text-stone-600 group-hover:text-stone-800 transition-colors duration-150">
                            {svc.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {errors.serviceIds && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.serviceIds.message}</p>
                )}
              </div>

              {/* ── Bio ── */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-stone-700 mb-1.5">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-amber-500 stroke-2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  Bio
                </label>
                <textarea
                  {...register("bio")}
                  rows={4}
                  placeholder="Describe your experience, skills, and what makes you a great provider…"
                  className={`w-full resize-none bg-stone-50 border rounded-xl px-4 py-3 text-sm text-stone-700 placeholder:text-stone-300
                    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent focus:bg-white
                    hover:border-stone-300
                    ${errors.bio ? "border-red-300 bg-red-50/50" : "border-stone-200"}`}
                />
                {errors.bio && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.bio.message}</p>
                )}
              </div>

              {/* ── Experience Years ── */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-stone-700 mb-1.5">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-amber-500 stroke-2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Years of Experience
                </label>
                <input
                  type="number"
                  min={0}
                  max={60}
                  placeholder="e.g. 3"
                  {...register("experienceYears", { valueAsNumber: true })}
                  className={`w-full bg-stone-50 border rounded-xl px-4 py-2.5 text-sm text-stone-700 placeholder:text-stone-300
                    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent focus:bg-white
                    hover:border-stone-300
                    ${errors.experienceYears ? "border-red-300 bg-red-50/50" : "border-stone-200"}`}
                />
                {errors.experienceYears && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.experienceYears.message}</p>
                )}
              </div>

              {/* ── Submit ── */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-400 text-stone-900 text-sm font-semibold
                  hover:bg-amber-300 active:scale-[0.98] transition-all duration-200 shadow-md shadow-amber-100 mt-2"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-stone-900 stroke-2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                Become a Provider
              </button>

            </form>
          </div>
        </div>

        <p className="text-center text-xs text-stone-400 mt-4">
          Your profile will be reviewed before going live.
        </p>
      </div>
    </div>
  );
}

export default BecomeProvider