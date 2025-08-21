import { Outlet } from "react-router-dom";
import Navbar from "../customer/components/navigations/Navbar";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch} from "react-redux";
import { updateUser } from "../features/user/userSlice";
import ScrollToTop from "../reusables/ScrollToTop";
import { updateCart } from "../features/cart/cartSlice";
import { updateWishlist } from "../features/wishlist/wishlistSlice";

const UserLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //Call function to fetch user profile
    fetchUser();
    fetchCart();
    fethWishlist();
  }, []);
  
  //Fetching User Profile Data and store in Redux Store
  const fetchUser = async () => {
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken) {
      try {
        const apiUri = `${import.meta.env.VITE_API_URL}/profile/get-user-data`;
        const response = await fetch(apiUri, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        const result = await response.json();
        dispatch(updateUser(result));
      } catch (error) {
        console.log("Invalid Login - Login Again", error);
      }
    }
  };

  //Fetching cart data and store in redux
  const fetchCart = async () => {
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken) {
      try {
        const apiUri = `${import.meta.env.VITE_API_URL}/user/get-cart`;
        const response = await fetch(apiUri, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        const result = await response.json();
        dispatch(updateCart(result));
      } catch (error) {
        console.log("Error while loading cart ", error);
      }
    }
  };

  //Fetching wishlist data and storing it in wishlist
  const fethWishlist = async () => {
    const jwtToken = Cookies.get("jwtToken");
    if(jwtToken) {
      try {
        const apiUri = `${import.meta.env.VITE_API_URL}/user/get-wishlist`;
        const response = await fetch(apiUri, {
          method: "GET",
          headers : {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        const result = await response.json();
        dispatch(updateWishlist(result));

      } catch (error) {
        console.log("Error while loading wishlist ", error);
      }
    }
  }

  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Outlet />
    </div>
  );
};
export default UserLayout;
