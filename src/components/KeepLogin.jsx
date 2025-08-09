import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";


const KeepLogin = ({ children }) => {
    const navigate = useNavigate();

    if (Cookies.get("token")) {
        navigate('/')
    }
    return <>{children}</>
}
export default KeepLogin