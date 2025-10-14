import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext"; // hook اللي بيرجع currentUser و role

interface ProtectedRouteProps {
    allowedRoles: string[];
    children: ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
    const { currentUser, userData } = useAuth(); // currentUser = { id, name, role, ... }
    const location = useLocation();

    // لو مش مسجل دخول
    if (!currentUser) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // console.log("-------userData------", userData, "-------------");
    // console.log('--------------------------')
    // console.log('userData?.role', userData?.role)
    // console.log('localStorage.getItem(role)', localStorage.getItem('role'))
    // console.log('allowedRoles', allowedRoles)
    // console.log('allowedRoles.includes(userData?.role)', allowedRoles.includes(userData?.role))
    // console.log('--------------------------')

    if (localStorage.getItem('token')) {
        if (userData?.role === 'candidate' && localStorage.getItem('role') === 'candidate') {
            if (!allowedRoles.includes(userData?.role)) {
                return <Navigate to="/not-access" replace />;
            }
        } else if (userData?.role === 'recruiter' && localStorage.getItem('role') === 'recruiter') {

            if (!allowedRoles.includes('employer')) {
                return <Navigate to="/not-access" replace />;
            }
        }
    } else {
        return <Navigate to="/not-access" replace />;
    }

    // else if (userData?.role === 'admin') {
    //     if (!allowedRoles.includes(userData?.role)) {
    //         return <Navigate to="/not-access" replace />;
    //     }
    // }


    // كل حاجة تمام → عرض الصفحة
    return <>{children}</>;
};

export default ProtectedRoute;
