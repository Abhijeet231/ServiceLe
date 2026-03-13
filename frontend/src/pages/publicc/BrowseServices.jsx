import React from "react";
import { getAllCategory } from "@/services/category.service.js";
import {
  getAllServiceByCategory,
  searchServices,
} from "@/services/service.service.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.jsx";
import { toast } from "react-toastify";

const BrowseServices = () => {
  const {user} = useAuth();
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // Check roles 
  useEffect(() => {
    if(user?.role === "provider") {
      navigate("/provider/dashboard");
      toast.info("You are not authorised to access Public pages!!")
    }
  },[user, navigate])

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategory();
        setCategories(res?.data?.data);
      } catch (error) {
        console.log("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch services based on selected category or search query
  const fetchServices = async () => {
    try {
      if (searchQuery) {
        const res = await searchServices({ q: searchQuery });
        setServices(res?.data?.data);
        return;
      }

      if (selectedCategory) {
        const res = await getAllServiceByCategory(selectedCategory);
        setServices(res?.data?.data);
        return;
      }
    } catch (error) {
      console.log("Error fetching services", error);
    }
  };

  // Debounce service fetching when filters change
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchServices();
    }, 400);
    return () => clearTimeout(delay);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* ── Page Title ── */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-5 rounded-full bg-amber-400" />
            <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase">
              Marketplace
            </p>
          </div>
          <h1 className="text-3xl font-semibold text-stone-800">
            Browse Services
          </h1>
          <p className="text-sm text-stone-400 mt-1">
            Find trusted services near you.
          </p>
        </div>

        {/* ── Search Filters ── */}
        <div className="bg-white border border-stone-100 rounded-2xl shadow-sm p-4 mb-10">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Category dropdown */}
            <div className="relative sm:w-56 shrink-0">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 pr-9 text-sm text-stone-600
                  focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent focus:bg-white
                  hover:border-stone-300 cursor-pointer transition-all duration-200"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 24 24"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 stroke-stone-400 fill-none stroke-2 pointer-events-none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {/* Search input */}
            <div className="relative flex-1">
              <svg
                viewBox="0 0 24 24"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 stroke-stone-400 fill-none stroke-2 pointer-events-none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedCategory("");
                }}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-stone-600 placeholder:text-stone-300
                  focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent focus:bg-white
                  hover:border-stone-300 transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 hover:text-stone-600 transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 stroke-current fill-none stroke-2"
                    strokeLinecap="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Categories Grid ── */}
        {categories.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-stone-700">
                Categories
              </h2>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory("")}
                  className="text-xs text-amber-500 hover:text-amber-600 font-medium transition-colors duration-150"
                >
                  Clear filter ✕
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat._id;
                return (
                  <button
                    key={cat._id}
                    onClick={() => setSelectedCategory(isActive ? "" : cat._id)}
                    className={`group text-left bg-white rounded-xl border px-5 py-4 shadow-sm
                      hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]
                      transition-all duration-200 cursor-pointer
                      ${
                        isActive
                          ? "border-amber-400 ring-2 ring-amber-400/30"
                          : "border-stone-100 hover:border-amber-200"
                      }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 transition-colors duration-200
                      ${isActive ? "bg-amber-400" : "bg-amber-50 group-hover:bg-amber-100"}`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className={`w-4 h-4 fill-none stroke-2 transition-colors duration-200
                          ${isActive ? "stroke-white" : "stroke-amber-500"}`}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                    <p
                      className={`text-sm font-medium truncate transition-colors duration-150
                      ${isActive ? "text-amber-600" : "text-stone-700 group-hover:text-stone-900"}`}
                    >
                      {cat.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Services Grid ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-stone-700">
              {selectedCategory || searchQuery ? "Results" : "All Services"}
            </h2>
            {services.length > 0 && (
              <span className="text-xs text-stone-400 bg-stone-100 px-2.5 py-1 rounded-full">
                {services.length} found
              </span>
            )}
          </div>

          {/* Empty state */}
          {services.length === 0 && (selectedCategory || searchQuery) && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center mb-4">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 stroke-stone-400 fill-none stroke-2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <p className="text-sm font-medium text-stone-500">
                No services found
              </p>
              <p className="text-xs text-stone-400 mt-1">
                Try a different category or search term
              </p>
            </div>
          )}

          {/* Default empty state */}
          {services.length === 0 && !selectedCategory && !searchQuery && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-4">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 stroke-amber-400 fill-none stroke-2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <p className="text-sm font-medium text-stone-500">
                Search or select a category
              </p>
              <p className="text-xs text-stone-400 mt-1">
                to explore available services
              </p>
            </div>
          )}

          {/* Service Cards */}
          {services.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((svc) => (
                <div
                  key={svc._id}
                  className="group bg-white rounded-xl border border-stone-100 shadow-sm hover:shadow-md
                    hover:-translate-y-0.5 transition-all duration-200 overflow-hidden cursor-pointer"
                >
                  {/* Card top accent */}
                  <div className="h-0.5 w-full bg-linear-to-r from-amber-300 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                  <div className="p-5">
                    {/* Category badge */}
                    {svc.category?.name && (
                      <span className="inline-block text-xs font-medium text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full mb-3">
                        {svc.category.name}
                      </span>
                    )}

                    {/* Service name */}
                    <h3 className="text-sm font-semibold text-stone-800 mb-1.5 group-hover:text-amber-600 transition-colors duration-150">
                      {svc.name}
                    </h3>

                    {/* Description */}
                    {svc.description && (
                      <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">
                        {svc.description}
                      </p>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-end mt-4">
                      <span
                        onClick={() => navigate("/customer/bookService", {
                          state: { service: svc },
                        })}
                        className="flex items-center gap-1 text-xs text-amber-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        View details
                        <svg
                          viewBox="0 0 24 24"
                          className="w-3 h-3 stroke-current fill-none stroke-2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default BrowseServices;
