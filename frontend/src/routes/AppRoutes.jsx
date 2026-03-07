import { createBrowserRouter } from "react-router-dom";
import App from "@/App";


// Pages
import Register from "@/pages/auth/Register.jsx";
import Login from "@/pages/auth/Login.jsx";
import Landing from "@/pages/publicc/Landing.jsx";
import About from "@/pages/publicc/About.jsx";
import BrowseServices from "@/pages/publicc/BrowseServices.jsx";
import ServiceDetails from "@/pages/publicc/ServiceDetails.jsx";

// Customer
import DashboardC from "@/pages/customer/DashboardC.jsx";
import ProfileC from "@/pages/customer/ProfileC.jsx";
import BookingsC from "@/pages/customer/BookingsC.jsx";
import BecomeProvider from "@/pages/customer/BecomeProvider.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

// Provider 
import BookingsP from "@/pages/provider/BookingsP.jsx";
import DashboardP from "@/pages/provider/DashboardP.jsx";
import ProfileP from "@/pages/provider/ProfileP.jsx";

// Admin
import Dashboard from "@/pages/admin/Dashboard.jsx";
import Providers from "@/pages/admin/Providers.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            //Public
            {index: true, element: <Landing/>},
            {path:"about", element:<About/>},
            {path:"services", element:<BrowseServices/>},
            {path:"services/:serviceId", element:<ServiceDetails/>},
        ]
    },
    // Auth Pages 
      {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
    {
    element: <ProtectedRoute />,
    children: [
      {
      path: "/customer",
      children: [
        { path: "dashboard", element: <DashboardC /> },
        { path: "bookings", element: <BookingsC /> },
        { path: "profile", element: <ProfileC /> },
        { path: "become-provider", element: <BecomeProvider /> }
      ]
    },
    {
        path: "/provider",
        children: [
            {path:"dashboard", element: <DashboardP/>},
            {path:"bookings", element: <BookingsP/>},
            {path:"profile", element: <ProfileP/>},

        ]
    },
    {
        path: "/admin",
        children: [
            {path: "dashboard", element: <Dashboard/>},
            {path:"providers", element: <Providers/>}
        ]
    }
    ],
  },
]);


export default router;
