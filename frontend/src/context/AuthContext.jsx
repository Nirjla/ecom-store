import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken, getTokenFromLocalStorage, isTokenExpired, removeTokenFromLocalStorage } from "../utils/utils";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const navigate = useNavigate();
    const handleLogout = () => {
        removeTokenFromLocalStorage();
        setIsAuthenticated(false);
        // navigate('/');
        toast.success("Logged Out Successfully");
    };
    useEffect(() => {
        const checkTokenValidity = () => {
            const token = getTokenFromLocalStorage();
            if (token) {
                const decodedToken = decodeToken(token);
                const currentTime = Date.now() / 1000;
                if (decodedToken && decodedToken.exp && decodedToken.exp < currentTime) {
                    // Token expired
                    handleLogout();
                } else {
                    // Token valid, set isAuthenticated to true
                    setIsAuthenticated(true);
                    const timeout = decodedToken.exp * 1000 - currentTime * 1000;
                    setTimeout(handleLogout, timeout); // Logout automatically after token expires
                }
            } else {
                // No token found
                setIsAuthenticated(false);
            }
        }
        checkTokenValidity()
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
