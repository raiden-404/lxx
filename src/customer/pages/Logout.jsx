import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    Cookies.remove("jwtToken");
    navigate("/");
  });

  return <div></div>;
};
export default Logout;
