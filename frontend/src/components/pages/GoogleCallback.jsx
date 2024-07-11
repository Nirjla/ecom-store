import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function GoogleCallback() {
      const location = useLocation();
      const { handleLogin } = useAuth();
      const [redirectTo, setRedirectTo] = useState(null);

      useEffect(() => {
            const searchParams = new URLSearchParams(location.search);
            const token = searchParams.get('token');
            if (token) {
                  handleLogin(token);
                  setRedirectTo('/');
            } else {
                  toast.error('Failed to login with Google');
                  setRedirectTo('/login');
            }
      }, [location, handleLogin]);

      if (redirectTo) {
            return <Navigate to={redirectTo} />;
      }

      return (
            <div>Logging in.....</div>
      );
}
