import { getProviderDetailsById } from '@/services/provider.service.js';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext.jsx';
import { Briefcase, Tag, Star, Clock, CheckCircle, MapPin, Mail } from 'lucide-react';

const Providers = () => {
  const { providerId } = useParams();
  const { user } = useAuth();

  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProvider = async () => {
    try {
      const res = await getProviderDetailsById(providerId);
      setProvider(res.data.data);
    } catch (err) {
      console.log("Error fetching provider:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProvider();
  }, []);

  // ── Loading state ──
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-amber-500 text-sm font-medium animate-pulse">Loading provider details...</div>
      </div>
    );
  }

  // ── Guard: if provider didn't load ──
  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Provider not found.</p>
      </div>
    );
  }

  // ── Status color helper ──
  const statusStyles = {
    approved: "bg-green-50 text-green-600 border-green-200",
    pending:  "bg-amber-50 text-amber-600 border-amber-200",
    rejected: "bg-red-50 text-red-500 border-red-200",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* ── Page header ── */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Provider Details</h1>
        <p className="text-sm text-gray-400 mt-0.5">Full profile view for admin review</p>
      </div>

      {/* ── Main card ── */}
      <div className="max-w-2xl bg-white rounded-2xl border border-amber-100 shadow-sm overflow-hidden">

        {/* ── Amber accent top bar ── */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 to-orange-400" />

        <div className="p-6">

          {/* ── Top: Avatar + Name + Status ── */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-2xl shrink-0">
              {provider.userId?.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">{provider.userId?.name}</h2>

              {/* Status badge */}
              <span className={`mt-1 inline-block text-xs font-medium px-2.5 py-0.5 rounded-full border ${statusStyles[provider.status] || statusStyles.pending}`}>
                {provider.status?.charAt(0).toUpperCase() + provider.status?.slice(1)}
              </span>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="border-t border-gray-100 mb-5" />

          {/* ── Info grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">

            <InfoRow icon={<Mail size={14} className="text-amber-500" />} label="Email" value={provider.userId?.email} />
            <InfoRow icon={<MapPin size={14} className="text-amber-500" />} label="City" value={provider.userId?.city || "—"} />
            <InfoRow icon={<Tag size={14} className="text-amber-500" />} label="Category" value={provider.categoryId?.name} />
            <InfoRow icon={<Clock size={14} className="text-amber-500" />} label="Experience" value={`${provider.experienceYears} ${provider.experienceYears === 1 ? "year" : "years"}`} />
            <InfoRow icon={<Star size={14} className="text-amber-500" />} label="Avg Rating" value={provider.averageRating ? `${provider.averageRating} / 5` : "No ratings yet"} />
            <InfoRow icon={<CheckCircle size={14} className="text-amber-500" />} label="Jobs Completed" value={provider.totalJobsCompleted ?? 0} />

          </div>

          {/* ── Services — array, so map it ── */}
          <div className="mb-5">
            <p className="text-xs text-gray-400 font-medium mb-2 flex items-center gap-1.5">
              <Briefcase size={13} className="text-amber-500" />
              Services Offered
            </p>
            <div className="flex flex-wrap gap-2">
              {provider.serviceIds?.map((service) => (
                <span
                  key={service._id}
                  className="text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full"
                >
                  {service.name}
                </span>
              ))}
            </div>
          </div>

          {/* ── Bio ── */}
          {provider.bio && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-xs text-gray-400 font-medium mb-1">Bio</p>
              <p className="text-sm text-gray-700 leading-relaxed">{provider.bio}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// ── Reusable info row ──
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-2.5">
    <span className="mt-0.5 shrink-0">{icon}</span>
    <div>
      <p className="text-xs text-gray-400 font-medium">{label}</p>
      <p className="text-sm text-gray-800 font-medium">{value || "—"}</p>
    </div>
  </div>
);

export default Providers;