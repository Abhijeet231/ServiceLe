import api from "@/services/api.js";

// Create provider Profile
export const createproviderProfile = (credentials) => {
    return api.post("", credentials)
};

// Update provider Profile
export const updateProviderProfile = (credentials) => {
    return api.patch("", credentials)
};

// Get All Approved  Providers profile
export const getApprovedProviders = (credentials) => {
    return api.get("", credentials)
}

// Get Single Provider With Details
export const getproviderDetails = (credentials) => {
    return api.get("", credentials)
}

// Toggle Availability Status
export const toggleStatus = (credentials) => {
    return api.patch("", credentials)
};

