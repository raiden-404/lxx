import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "../features/user/userSlice";
const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    Cookies.remove("jwtToken");
    dispatch(removeUser());
    navigate("/");
  });

  return <div></div>;
};
export default Logout;
