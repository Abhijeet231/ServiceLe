import { useState } from "react";

const STATUS_STYLES = {
  requested: "bg-amber-50 text-amber-600 border border-amber-200",
  confirmed: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  "in-progress": "bg-blue-50 text-blue-600 border border-blue-200",
  completed: "bg-green-50 text-green-600 border border-green-200",
  cancelled: "bg-red-50 text-red-500 border border-red-200",
};

const STATUS_DOT = {
  requested: "bg-amber-400",
  confirmed: "bg-emerald-400",
  "in-progress": "bg-blue-400",
  completed: "bg-green-400",
  cancelled: "bg-red-400",
};

const STATUS_LABEL = {
  requested: "Pending",
  confirmed: "Confirmed",
  "in-progress": "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function BookingCard({ service, status, city, address, onClick }) {

  const style = STATUS_STYLES[status] || STATUS_STYLES["requested"];
  const dot = STATUS_DOT[status] || STATUS_DOT["requested"];
  const label = STATUS_LABEL[status] || "Pending";

  return (
    <div 
     onClick={onClick}
    className="w-full rounded-lg shadow-sm border border-stone-100 p-5 flex flex-col gap-4 overflow-hidden mb-5 bg-amber-50/40 cursor-pointer">

      {/* Top Row */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold text-stone-800 leading-snug">
          {service}
        </h3>

        <span
          className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${style}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
          {label}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-stone-100" />

      {/* Bottom Info */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">

        {/* City */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-md bg-stone-50 border border-stone-100 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-stone-400 fill-none stroke-2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>

          <span className="text-sm text-stone-500 whitespace-nowrap">
            {city}
          </span>
        </div>

        {/* Divider desktop */}
        <div className="hidden sm:block w-px bg-stone-100 self-stretch" />

        {/* Address */}
        <div className="flex justify-center items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-md bg-stone-50 border border-stone-100 flex items-center justify-center shrink-0 mt-0.5">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-stone-400 fill-none stroke-2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>

          <p className="text-sm text-stone-500 wrap-break-word min-w-0 ">
            <span className="font-medium text-stone-700">Address: </span>
            {address}
          </p>
        </div>

      </div>
    </div>
  );
}