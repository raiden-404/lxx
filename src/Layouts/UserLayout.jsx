import { Outlet } from "react-router-dom";
import Navbar from "../customer/components/navigations/Navbar";

const UserLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}
export default UserLayout;