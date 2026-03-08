import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"


const ProviderOnlyRoute = () => {

    const {status, user} = useAuth();

    if(status === "loading") {
        return <div>Loading...</div>
    }

    if(status !== "authenticated") {
        return <Navigate to= "/login" replace/>
    }

  if(user.role !== "provider") {
    return <Navigate to= "/" replace/>
  }

  return <Outlet/>
}

export default ProviderOnlyRoute