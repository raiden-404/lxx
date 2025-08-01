import { Outlet } from "react-router-dom"
import Navbar from "../customer/components/navigations/Navbar"

const AdminLayout = () => {
  return (
    <div>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default AdminLayout