import { Navigate, useLocation } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { useEffect } from "react"
import { toast } from "react-toastify"

export default function GoogleCallback() {
      const location = useLocation()
      const { handleLogin } = useAuth()
      useEffect(() => {
            const searchParams = new URLSearchParams(location.search)
            const token = searchParams.get('token')
            if (token) {
                  handleLogin(token)
                  return <Navigate to='/' />
            }
            else {
                  toast.error('Failed to login with Google')
                  return <Navigate to="/login" />
            }
      }, [location, handleLogin])
      return (
            <>
                  <div>Logging in.....</div>
            </>
      )
}