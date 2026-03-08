
import { useState } from "react";

// ── Status config ──────────────────────────────────────────────
const STATUS_MAP = {
  requested:   { dot: "bg-amber-400",   pill: "bg-amber-50 text-amber-600 border-amber-200"   },
  confirmed:   { dot: "bg-emerald-400", pill: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  "in-progress":{ dot: "bg-blue-400",  pill: "bg-blue-50 text-blue-600 border-blue-200"       },
  completed:   { dot: "bg-green-500",   pill: "bg-green-50 text-green-600 border-green-200"   },
  cancelled:   { dot: "bg-red-400",     pill: "bg-red-50 text-red-500 border-red-200"         },
};

// ── Sub-components ─────────────────────────────────────────────
function StatusBadge({ status }) {
  const key = status?.toLowerCase();
  const style = STATUS_MAP[key] ?? {
    dot: "bg-stone-400",
    pill: "bg-stone-50 text-stone-500 border-stone-200",
  };
  const label = status
    ? status.charAt(0).toUpperCase() + status.slice(1)
    : "Unknown";

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${style.pill}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {label}
    </span>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-center shrink-0 mt-0.5">
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 stroke-stone-400 fill-none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {icon}
        </svg>
      </div>
      <div className="min-w-0">
        <p className="text-xs text-stone-400 mb-0.5">{label}</p>
        <p className="text-sm font-medium text-stone-700 wrap-break-word">{value}</p>
      </div>
    </div>
  );
}

function ImageGrid({ images }) {
  const [zoomed, setZoomed] = useState(null);

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 rounded-xl bg-stone-50 border border-dashed border-stone-200">
        <div className="text-center">
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 stroke-stone-300 fill-none mx-auto mb-2"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <p className="text-xs text-stone-400">No images uploaded yet</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {images.map((img, i) => (
          <div
            key={img.public_id ?? i}
            className="overflow-hidden rounded-xl border border-stone-100 cursor-pointer"
            onClick={() => setZoomed(img.url)}
          >
            <img
              src={img.url}
              alt={`image-${i + 1}`}
              className="w-full h-28 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6"
          onClick={() => setZoomed(null)}
        >
          <img
            src={zoomed}
            alt="preview"
            className="max-w-full max-h-full rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </>
  );
}

function SectionDivider({ label }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-stone-100" />
      <span className="text-xs font-semibold tracking-widest text-stone-400 uppercase">
        {label}
      </span>
      <div className="flex-1 h-px bg-stone-100" />
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────
export default function BookingDetailsCard({
  address ,
  city ,
  price = 120,
  status ,
  beforeImages ,
  afterImages  ,
}) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap"
        rel="stylesheet"
      />

      {/* Page centering wrapper */}
      <div
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        className="min-h-screen bg-stone-50 flex justify-center items-center p-4 sm:p-8"
      >
        {/* Card */}
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">

          {/* Amber top accent bar */}
          <div className="h-1 w-full bg-linear-to-r from-amber-300 via-amber-400 to-orange-300" />

          <div className="p-6 flex flex-col gap-6">

            {/* ── Header ── */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium tracking-widest text-stone-400 uppercase mb-0.5">
                  Overview
                </p>
                <h2
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                  className="text-2xl text-stone-800 leading-tight"
                >
                  Booking Details
                </h2>
              </div>
              <StatusBadge status={status} />
            </div>

            {/* ── Info section ── */}
            <div className="flex flex-col gap-3.5">
              <InfoRow
                label="Address"
                value={address}
                icon={
                  <>
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </>
                }
              />
              <InfoRow
                label="City"
                value={city}
                icon={
                  <>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </>
                }
              />
              <InfoRow
                label="Price"
                value={`$${price}`}
                icon={
                  <>
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </>
                }
              />
            </div>

            {/* ── Before Work ── */}
            <div className="flex flex-col gap-3">
              <SectionDivider label="Before Work" />
              <ImageGrid images={beforeImages} />
            </div>

            {/* ── After Work ── */}
            <div className="flex flex-col gap-3">
              <SectionDivider label="After Work" />
              <ImageGrid images={afterImages} />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}