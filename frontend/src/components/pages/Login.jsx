import { useState } from "react"
import { useLoginUserMutation } from "../../api/apiSlice"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function Login() {
      const navigate = useNavigate('/')
      const [loginUser] = useLoginUserMutation()
      const [formData, setFormData] = useState({
            email: "",
            password: ""
      })
      console.log(formData)
      const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value })
      }
      const handleSubmit = async (e) => {
            e.preventDefault()
            try {
                  const response = await loginUser(formData).unwrap()
                  // console.log(response)
                  // const { token } = data;
                  localStorage.setItem("token", response.token);
                  toast.success('Login Successfully', {
                        position: "bottom-right"
                  })
                  navigate("/");

            } catch (error) {
                  console.error("Error logging in:", error);
                  // Handle specific errors if needed
            }
      }

      return (<>
            <div>
                  <form action="" method="POST" onSubmit={handleSubmit}>
                        <input type="email" name="email" onChange={handleChange} />
                        <input type="password" id="" name="password" onChange={handleChange} />
                        <button type="submit">Sign In</button>
                  </form>
            </div>
      </>)
}