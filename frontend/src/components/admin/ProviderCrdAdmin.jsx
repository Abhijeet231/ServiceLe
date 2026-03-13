import React, { useState } from 'react'
import { Briefcase, Tag, FileText, Check, X, Eye } from 'lucide-react'
import { approveProvider, rejectProvider } from "@/services/admin.service.js"
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'

const ProviderCrdAdmin = ({ provider, providerId, onAction }) => {
  const { categoryId, serviceIds, userId, bio, status } = provider
  const [loading, setLoading] = useState(null) // 'approve' | 'reject' | null
  const navigate = useNavigate()

  const handleApprove = async () => {
    setLoading('approve')
    try {
      await approveProvider(providerId)
      toast.success("Provider approved!")
      onAction()
    } catch (error) {
      toast.error("Failed to approve provider.")
    } finally {
      setLoading(null)
    }
  }

  const handleReject = async () => {
    setLoading('reject')
    try {
      await rejectProvider(providerId)
      toast.success("Provider rejected.")
      onAction()
    } catch (error) {
      toast.error("Failed to reject provider.")
    } finally {
      setLoading(null)
    }
  }

  const handleView = () => {
    navigate(`/admin/providers/${providerId}`)
  }

  return (
    <div className="bg-white border border-amber-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-200 w-full">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-lg shrink-0">
          {userId?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-base leading-tight">{userId?.name}</h3>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            status === "approved" ? "text-green-600 bg-green-50" :
            status === "rejected" ? "text-red-500 bg-red-50" :
            "text-amber-600 bg-amber-50"
          }`}>
            {status?.charAt(0).toUpperCase() + status?.slice(1)}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-amber-50 mb-4" />

      {/* Info Rows */}
      <div className="space-y-2.5 text-sm mb-5">
        <div className="flex items-start gap-2 text-gray-600">
          <Tag size={14} className="text-amber-500 mt-0.5 shrink-0" />
          <span>
            <span className="text-gray-400 mr-1">Category:</span>
            <span className="font-medium text-gray-700">{categoryId?.name || "—"}</span>
          </span>
        </div>

        <div className="flex items-start gap-2 text-gray-600">
          <Briefcase size={14} className="text-amber-500 mt-0.5 shrink-0" />
          <span>
            <span className="text-gray-400 mr-1">Services:</span>
            <span className="font-medium text-gray-700">
              {serviceIds?.map((s) => s.name).join(", ") || "—"}
            </span>
          </span>
        </div>

        <div className="flex items-start gap-2 text-gray-600">
          <FileText size={14} className="text-amber-500 mt-0.5 shrink-0" />
          <span>
            <span className="text-gray-400 mr-1">Bio:</span>
            <span className="text-gray-700 line-clamp-2">{bio || "—"}</span>
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">

        {/* Approve — only pending */}
        {status === "pending" && (
          <button
            onClick={handleApprove}
            disabled={loading === 'approve'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-50 text-green-600 hover:bg-green-100 transition disabled:opacity-50"
          >
            <Check size={13} />
            {loading === 'approve' ? "Approving..." : "Approve"}
          </button>
        )}

        {/* Reject — pending or approved */}
        {(status === "pending" || status === "approved") && (
          <button
            onClick={handleReject}
            disabled={loading === 'reject'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-500 hover:bg-red-100 transition disabled:opacity-50"
          >
            <X size={13} />
            {loading === 'reject' ? "Rejecting..." : "Reject"}
          </button>
        )}

        {/* View — always */}
        <button
          onClick={handleView}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-600 hover:bg-amber-100 transition ml-auto"
        >
          <Eye size={13} />
          View
        </button>

      </div>
    </div>
  )
}

export default ProviderCrdAdmin