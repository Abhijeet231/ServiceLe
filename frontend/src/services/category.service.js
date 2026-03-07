import api from "@/services/api.js";


// Create New Categroy (admin only)
export const createCategory = (credentials) => {
    return api.post("", credentials)
}

// Get all category
export const getAllCategory = (credentials) => {
    return api.get("", credentials)
};

// Get Individual Category
export const getSingleCategory = (credentials) => {
    return api.get("", credentials)
};

// Delete Category (admin only)
export const deleteCategory = () => {
    return api.delete("")
}