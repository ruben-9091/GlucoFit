import { useAuth } from "../hooks/use-auth";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }){
    const { user } = useAuth(); 
    if (user) {
        return children; 
    } else {
        return <Navigate to="/login"/>
    }
}

export default PrivateRoute; 