import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"


const CustomerOnlyRoutes = () => {

    const {status, user} = useAuth();

    if(status === "loading") {
        return <div>Loading...</div>
    }

    if(status !== "authenticated") {
        return <Navigate to= "/login" replace/>
    }

  if(user.role !== "customer") {
    return <Navigate to= "/" replace/>
  }

  return <Outlet/>
}

export default CustomerOnlyRoutes