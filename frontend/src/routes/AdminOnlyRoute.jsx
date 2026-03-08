import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"


const AdminOnlyRoute = () => {

    const {status, user} = useAuth();

    if(status === "loading") {
        return <div>Loading...</div>
    }

    if(status !== "authenticated") {
        return <Navigate to= "/login" replace/>
    }

  if (user.role !== "admin") {
  return <Navigate to={`/${user.role}/dashboard`} replace />
}

  return <Outlet/>
}

export default AdminOnlyRoute