import { createContext, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

// Define props type for the Provider
interface Props {
    children: ReactNode;
}

// Create the context with a temporary 'any' type (like original)
export const ProtectedRouteContext = createContext<any>(null);


const ProtectedRouteContextProvider = (props: Props) => {
    const { currentUser } = useAuth();
    if (localStorage.getItem('role') !== currentUser?.role) {
        return <Navigate to='/' state={{ path: location.pathname }} />;
    }

    const value = {};

    return (
        <ProtectedRouteContext.Provider value={value}>
            {props.children}
        </ProtectedRouteContext.Provider>
    );
};

export default ProtectedRouteContextProvider;
