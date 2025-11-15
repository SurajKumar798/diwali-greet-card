import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

function PrivateRoute({children}){
    const token = Cookies.get('token');
    console.log("token", token);
    const isAuthenticated = !!token;
    return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default PrivateRoute;