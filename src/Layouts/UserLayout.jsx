import { Outlet } from "react-router-dom";
import Navbar from "../customer/components/navigations/Navbar";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { updateUser } from "../features/user/userSlice";

const UserLayout = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        //Call function to fetch user profile
        fetchUser();
    },[]);

    //Fetching User Profile Data and store in Redux Store
    const fetchUser = async () => {
        const jwtToken = Cookies.get("jwtToken");
        if(jwtToken) {
            try{
                const apiUri = "http://localhost:8080/profile/get-user-data";
                const response = await fetch(apiUri,{
                    method: "GET",
                    headers : {
                        Authorization : `Bearer ${jwtToken}`
                    },
                });

                const result = await response.json();
                dispatch(updateUser(result));

            } catch (error) {
                console.log("Invalid Login - Login Again",error);
            }
        }
    }

    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}
export default UserLayout;