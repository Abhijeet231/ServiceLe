import { Outlet } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import { ToastContainer, Zoom } from "react-toastify"

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
    <Navbar/>
    <main className="flex-1">

    <Outlet/>
    </main>
    <Footer/>

        <ToastContainer
        position="top-right"
        autoClose={2500}
        transition={Zoom}
        closeOnClick
        draggable
        pauseOnHover
        newestOnTop
        hideProgressBar={false}
      />
    </div>
  )
}

export default App