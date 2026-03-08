import api from "@/services/api.js";

// Create service (admin only)
export const createService = (credentials) => {
  return api.post("/api/v1/categories/:categoryId/services", credentials);
};

// Get all Service Listed By category
export const getAllServiceByCategory = (credentials) => {
  return api.get(`/api/v1/categories/${credentials}/services`);
};

// Search All Services
export const searchServices = (params) => {
  return api.get("/api/v1/services/search", { params });
};

// Get Individual Service
export const getIndividualService = (credentials) => {
  return api.get(`/api/v1/services/:serviceId${credentials}`);
};

// Delete Individual Service (admin only)
export const deleteIndividualService = (credentials) => {
  return api.delete("/api/v1/services/:serviceId", credentials);
};
