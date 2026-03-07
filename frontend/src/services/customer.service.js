import api from "@/services/api.js";

// Get LoggedIn User
export const getMe = () => {
    return api.get("/api/v1/api/v1/users/me")
};

// Update User/customer Profile
export const updateCustomerProfile = (credentials) => {
    return api.patch("api/v1/users/me", credentials)
}