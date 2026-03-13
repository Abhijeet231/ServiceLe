import { getAllPendingProviders, approveProvider, rejectProvider } from "@/services/admin.service.js"
import { toast } from "react-toastify"
import { useAuth } from "@/context/AuthContext.jsx"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ProviderCrdAdmin from "@/components/admin/ProviderCrdAdmin.jsx"



const Dashboard = () => {

  const [providers, setProviders] = useState([]);

  // function to fetch all pending provider profile
  const fetchAllPendingProviders  = async () => {
    try {
     const res =  await getAllPendingProviders();
     setProviders(res.data?.data);
     console.log("Pending Providers:", providers)
    } catch (error) {
      toast.error("Error while fetching all Pending Providers!");
      console.log("Error While Fetching all Pending Providers:", error)
    }
  }

  useEffect(() => {
    fetchAllPendingProviders()
  },[])


  return (
    <div>
        
    </div>
  )
}

export default Dashboard