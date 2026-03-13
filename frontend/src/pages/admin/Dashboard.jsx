import {
  getAllPendingProviders,
  approveProvider,
  rejectProvider,
} from "@/services/admin.service.js";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext.jsx";
import { useState, useEffect } from "react";
import ProviderCrdAdmin from "@/components/admin/ProviderCrdAdmin.jsx";
import { ShieldCheck, Mail, User, MapPin, Clock } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [providers, setProviders] = useState([]);

  const fetchAllPendingProviders = async () => {
    try {
      const res = await getAllPendingProviders();
      setProviders(res.data?.data);
    } catch (error) {
      toast.error("Error while fetching all Pending Providers!");
      console.log("Error While Fetching all Pending Providers:", error);
    }
  };

  useEffect(() => {
    fetchAllPendingProviders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* ── Page Title ── */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage providers and platform settings</p>
      </div>

      {/* ────────────────────────────────────────────────
          MAIN LAYOUT: left 35% profile | right 65% list
          
          KEY TRICK for fixed-height scrollable panel:
          - Parent row uses `items-start` (not stretch)
          - Both columns use `sticky top-6` or fixed height
          - The providers column uses `h-[calc(100vh-160px)] overflow-y-auto`
            This means: full viewport height minus the top offset
            So it never grows beyond the screen — it scrolls internally
      ─────────────────────────────────────────────── */}
      <div className="flex gap-6 items-start">

        {/* ── LEFT: Admin Profile Panel (sticky, stays in place while right side scrolls) ── */}
        <div className="w-[35%] sticky top-6 shrink-0">
          <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-6">

            {/* Avatar + Name */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-2xl mb-3">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-lg font-semibold text-gray-900">{user?.name}</h2>

              {/* Admin badge */}
              <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                <ShieldCheck size={11} />
                Administrator
              </span>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 mb-4" />

            {/* Info rows */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2.5 text-gray-600">
                <Mail size={14} className="text-amber-500 shrink-0" />
                <span className="truncate">{user?.email}</span>
              </div>

              <div className="flex items-center gap-2.5 text-gray-600">
                <User size={14} className="text-amber-500 shrink-0" />
                <span>{user?.name}</span>
              </div>

              {user?.city && (
                <div className="flex items-center gap-2.5 text-gray-600">
                  <MapPin size={14} className="text-amber-500 shrink-0" />
                  <span>{user.city}</span>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 mt-4 mb-4" />

            {/* Quick stat */}
            <div className="bg-amber-50 rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-amber-600 font-medium">Pending Reviews</p>
                <p className="text-2xl font-bold text-amber-700">{providers.length}</p>
              </div>
              <Clock size={28} className="text-amber-300" />
            </div>
          </div>
        </div>

        {/* ── RIGHT: Pending Providers Panel ── */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl border border-amber-100 shadow-sm">

            {/* Panel header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">
                  {providers.length ? "Pending Provider Approvals" : "No Pending Providers"}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {providers.length} awaiting review
                </p>
              </div>
            </div>

            {/* ── SCROLLABLE AREA ──
                h-[calc(100vh-220px)] → height = screen height minus top padding/header
                overflow-y-auto       → scrolls internally, never pushes page down
                This is the key to keeping it fixed height while list grows
            ── */}
            <div className="h-[calc(100vh-220px)] overflow-y-auto p-4 space-y-3">
              {providers.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <ShieldCheck size={36} className="mb-2 text-amber-200" />
                  <p className="text-sm">All caught up! No pending providers.</p>
                </div>
              ) : (
                providers.map((el) => (
                  <ProviderCrdAdmin
                    key={el._id}
                    provider={el}
                    providerId={el._id}
                    onAction={fetchAllPendingProviders}
                  />
                ))
              )}
            </div>
          </div>
        </div>

      </div>

      {/* ── BOTTOM: Create Category Section (build tomorrow) ── */}
      <div className="mt-6">
        {/* Create Category will go here */}
      </div>

    </div>
  );
};

export default Dashboard;

