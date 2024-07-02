import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
export function useAuth() {
      const [isAuthenticated, setIsAuthenticated] = useState(false)
      const navigate = useNavigate()
      useEffect(() => {
            const token = localStorage.getItem('token')
            console.log(token)
            if (token) {
                  setIsAuthenticated(true)
            } else {
                  setIsAuthenticated(false)

            }
      }, [])
      const handleLogout = () => {
            localStorage.removeItem('token')
            setIsAuthenticated(false)
            navigate('/')
            toast.success("Logged Out successfully")
      }
      return {
            handleLogout, isAuthenticated
      }
}


