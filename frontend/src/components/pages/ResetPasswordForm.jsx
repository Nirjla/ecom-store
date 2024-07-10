import { useState } from "react"
import { useParams } from "react-router-dom"
import { useResetPasswordMutation } from "../../api/apiSlice"
import { toast } from "react-toastify"

export default function ResetPasswordForm() {
      const { token } = useParams()
      // console.log(token)
      const [resetPassword, { isLoading }] = useResetPasswordMutation()
      const [newPassword, setNewPassword] = useState('')
      const handleSubmit = async (e) => {
            e.preventDefault()
            try {
                  await resetPassword({ newPassword, token }).unwrap()
                  toast.success('Password reset successfully');
            } catch (error) {
                  console.error('Error resetting password:', error);
                  toast.error('Failed to reset password');
            }
      }
      return (<>
            <form method="post" onSubmit={handleSubmit}>
                  <input type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                  />
                  <button type="submit" disabled={isLoading}>Submit</button>
            </form>
      </>)
}