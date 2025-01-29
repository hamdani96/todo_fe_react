import {
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import Swal from 'sweetalert2'
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Register() {
    const {setToken} = useContext(AppContext)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    // console.log(formData)

    const [errors, setErrors] = useState({})

    async function handleRegister(e) {
      e.preventDefault()

      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(formData)
      })

      const data = await res.json();

      if(data.errors) {
        setErrors(data.errors)
      } else {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registered successfully, and you are now logged in",
          showConfirmButton: false,
          timer: 1500
        });
        localStorage.setItem('token', data.token)
        setToken(data.token)
        navigate('/')
        // console.log(data)
      }
    }

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card className="mt-6 w-96">
          <form onSubmit={handleRegister}>
          <CardBody>
            <div className="flex justify-center mb-4">
            <h1 className="font-bold text-2xl">Register</h1>
            </div>
            <div className="mb-4">
                <input className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div className="mb-4">
                <input className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="mb-4">
                <input type="password" className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <div className="mb-4">
                <input type="password" className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Confirm your password" value={formData.password_confirmation} onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}/>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <button className="primary-btn w-full mb-3">Register</button>
            <span className="text-blue-400">Sudah punya akun? <Link to="/login">Login</Link></span>
          </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
