import api from "@/services/api.js";


// Create New Categroy (admin only)
export const createCategory = (credentials) => {
    return api.post("/api/v1/categories", credentials)
}

// Get all category
export const getAllCategory = (credentials) => {
    return api.get("/api/v1/categories", credentials)
};

// Get Individual Category
export const getSingleCategory = (credentials) => {
    return api.get(`/api/v1/categories/:categoryId/${credentials}`)
};

// Delete Category (admin only)
export const deleteCategory = (credentials) => {
    return api.delete(`/api/v1/categories/${credentials}`)
}