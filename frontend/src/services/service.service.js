import api from "@/services/api.js";

// Create service (admin only)
export const createService = (credentials) => {
    return api.post("", credentials)
};

// Get all Service Listed By category
export const getAllServiceByCategory = (credentials) => {
    return api.get("", credentials)
};

// Search All Services
export const searchServices = (credentials) => {
    return api.get("", credentials)
}

// Get Individual Service
export const getIndividualService = (credentials) => {
    return api.get("", credentials)
}

// Delete Individual Service (admin only)
export const deleteIndividualService = (credentials) => {
    return api.delete("", credentials)
};