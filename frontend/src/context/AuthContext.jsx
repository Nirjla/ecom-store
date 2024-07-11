import { createContext, useEffect, useState } from "react";
import { decodeToken, getTokenFromLocalStorage, isTokenExpired, removeTokenFromLocalStorage, setTokenInLocalStorage } from "../utils/utils";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const navigate = useNavigate();

    const handleLogout = () => {
        removeTokenFromLocalStorage();
        setIsAuthenticated(false);
        // window.location.href = '/';
        toast.success("Logged Out Successfully");
    };

    const handleLogin = (token) => {
        setTokenInLocalStorage(token);
        setIsAuthenticated(true);
        toast.success("Logged In Successfully");
        // window.location.href = '/';
    };

    useEffect(() => {
        const checkTokenValidity = () => {
            const token = getTokenFromLocalStorage();
            if (token) {
                const decodedToken = decodeToken(token);
                const currentTime = Date.now() / 1000;
                if (decodedToken && decodedToken.exp && decodedToken.exp < currentTime) {
                    handleLogout();
                } else {
                    setIsAuthenticated(true);
                    const timeout = decodedToken.exp * 1000 - currentTime * 1000;
                    setTimeout(handleLogout, timeout);
                }
            } else {
                setIsAuthenticated(false);
            }
        }
        checkTokenValidity();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, handleLogout, handleLogin }}>
            {children}
        </AuthContext.Provider>
    );
};
