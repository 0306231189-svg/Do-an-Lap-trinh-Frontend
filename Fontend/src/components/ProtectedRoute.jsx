import { useAuth } from "../Context/AuthContext"
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const { isAuth } = useAuth();
    const location = useLocation();
    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children;
}
export default ProtectedRoute;