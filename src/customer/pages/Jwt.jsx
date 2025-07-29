import { useSearchParams } from "react-router-dom";

const Jwt = () => {
    const [param] = useSearchParams();
    const token = param.get("token");
    return( 
        <div>
            <h1>{token}</h1>
        </div>
    )
}
export default Jwt;