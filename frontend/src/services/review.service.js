import api from "@/services/api.js";

// Create review
export const createReview = (credentials) => {
    return api.post("", credentials)
};

// Get Reviews for Individual Provider
export const getAllReviewsForProvider = (credentials) => {
    return api.get("", credentials)
};

// Get all reviews made by individual customer
export const getAllReviewByCustomer = (credentials) => {
    return api.get("", credentials)
} 

// Delete Review (admin or Cusotmer)
export const deleteReview = () => {
    return api.delete("")
}
