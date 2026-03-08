import api from "@/services/api.js";

// Create provider Profile
export const createproviderProfile = (credentials) => {
    return api.post("/api/v1/providers/profile", credentials)
};

// Update provider Profile
export const updateProviderProfile = (credentials) => {
    return api.patch("/api/v1/providers/profile", credentials)
};

// Get All Approved  Providers profile
export const getApprovedProviders = (credentials) => {
    return api.get("/api/v1/providers", credentials)
}

// Get Single Provider With Details
export const getproviderDetails = () => {
    return api.get("/api/v1/providers/me")
}

// Toggle Availability Status
export const toggleStatus = () => {
    return api.patch("/api/v1/providers/availability")
};

