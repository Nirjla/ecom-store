import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegisterUserMutation } from "../../api/apiSlice";

export default function Register() {
      const [registerUser] = useRegisterUserMutation()
      const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', password: '' })
      const [errorMessage, setErrorMessage] = useState('')
      const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value })
            // console.log(formData)
      }
      const handleSubmit = async (e) => {
            e.preventDefault()
            try {
                  await registerUser(formData).unwrap()
                  alert('User registered successfully')
            } catch (err) {
                  setErrorMessage(err.data.message)
            }
      }
      return (<>
            <form method="POST" onSubmit={handleSubmit} >
                  <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} />
                  <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} />
                  <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                  <input type="password" name="password" placeholder="Password" autoComplete="current-password" onChange={handleChange} />
                  <button type="submit">Sign Up</button>
                  {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                  <p>Already have an account?</p>
                  <Link to={"/login"}>Sign In</Link>
            </form>
      </>)
}