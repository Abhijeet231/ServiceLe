import api from "./api.js";

// Get all pending providers
export const getAllPendingProviders = () => {
    return api.get("api/v1/admin/providers/pending")
};

// Approve a provider
export const approveProvider = (credentials) => {
    return api.patch(`/api/v1/admin/providers/${credentials}/approve`)
};

// Reject a provider
export const rejectProvider = (credentials) => {
    return api.patch(`/api/v1/admin/providers/${credentials}/reject`)
}