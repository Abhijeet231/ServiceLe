import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  login as loginService,
  logout as logoutService,
} from "@/services/auth.service.js";
import { getMe } from "@/services/customer.service.js";
import { toast } from "react-toastify";

// Cretaing context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  // Checking existing sessions
  const checkAuth = useCallback(async () => {
    try {
      setStatus("loading");
      const res = await getMe();
      console.log("Response", res.data.data);
      setUser(res.data.data);
      setStatus("authenticated");
    } catch (error) {
      console.log("Auth check failed");
      setUser(null);
      setStatus("unauthenticated");
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Login
  const login = useCallback(async (credentials) => {
    try {
      const res = await loginService(credentials);
      setUser(res.data.data);
      setStatus("authenticated");
      return res;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    await logoutService();
    setUser(null);
    setStatus("unauthenticated");
    toast.success("Logged Out Successfully.");
  }, []);

  const value = {
    user,
    status,
    isAuthenticated: status === "authenticated",
    login,
    logout,
    refreshUser: checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Use Auth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
