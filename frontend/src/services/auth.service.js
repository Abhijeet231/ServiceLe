import api from "@/services/api.js";

// Register
export const register = (credentials) => {
    return api.post("/api/v1/auth/register", credentials)
};

// Login
export const login = (credentials) => {
    return api.post("/api/v1/auth/login", credentials)
};

// Logout
export const logout = () => {
    return api.post("/api/v1/auth/logout")
};

