import { Outlet } from "react-router-dom"
import Navbar from "../customer/components/navigations/Navbar"
import ScrollToTop from "../reusables/ScrollToTop"

const AdminLayout = () => {
  return (
    <div>
        <ScrollToTop />
        <Navbar />
        <Outlet />
    </div>
  )
}

export default AdminLayout