import { useState } from "react";
import { useForgotPasswordMutation } from "../../api/apiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email });
      toast.success("Password reset instructions sent to your email");
    } catch (error) {
      console.error("Error sending reset email:", error);
      toast.error("Failed to send reset email");
    }
  };

  return (
    <>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <button type="submit" disabled={isLoading}>Send Reset Email</button>
      </form>
    </>
  );
}
