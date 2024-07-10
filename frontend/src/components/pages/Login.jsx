import { useState, useContext } from "react";
import { useGoogleLoginMutation, useLoginUserMutation } from "../../api/apiSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import ForgotPassword from "./ForgotPassword";

export default function Login() {
    const navigate = useNavigate();
    const [loginUser] = useLoginUserMutation();
    const [googleLogin] = useGoogleLoginMutation()
    const { handleLogin } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData).unwrap();
            handleLogin(response.token);
        } catch (error) {
            console.error("Error logging in:", error);
            toast.error("Failed to log in");
        }
    };


    return (
        <div>
            <form method="POST" onSubmit={handleSubmit}>
                <input type="email" name="email" onChange={handleChange} value={formData.email} required />
                <input type="password" name="password" onChange={handleChange} value={formData.password} required />
                <button type="submit">Sign In</button>
            </form>
            <Link to='/auth/forgot-password'>Forgot Password?</Link>
        </div>
    );
}
