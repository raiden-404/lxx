import { Outlet } from "react-router-dom";
import Navbar from "../customer/components/navigations/Navbar";
import HomeFooter from "../customer/components/Footer/HomeFooter";

const UserLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <HomeFooter />
        </div>
    )
}
export default UserLayout;