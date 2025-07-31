import { useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

const Jwt = () => {
  const navigate = useNavigate();
  const [param] = useSearchParams();
  const token = param.get("token");
  
  useEffect(() => {
    if(token) {
        Cookies.set("jwtToken",token);
    }
    setTimeout(()=> {
        navigate("/");
    },1500);
  },[token,navigate]);

  return <div>Wait for moment....</div>;
};
export default Jwt;
