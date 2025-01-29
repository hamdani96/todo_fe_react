import { Card, CardBody, CardFooter } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Login() {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // console.log(formData)

  const [errors, setErrors] = useState({});

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login successfully, and you are now logged in",
        showConfirmButton: false,
        timer: 1500,
      });
      localStorage.setItem("token", data.token.plainTextToken);
      setToken(data.token.plainTextToken);
      navigate("/");
      // console.log(data)
    }
  }

  const [loginUrl, setLoginUrl] = useState(null);

  useEffect(() => {
    fetch("/api/authGoogle")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong!");
      })
      .then((data) => setLoginUrl(data.url))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card className="mt-6 w-96">
          <form onSubmit={handleLogin}>
            <CardBody>
              <div className="flex justify-center mb-4">
                <h1 className="font-bold text-2xl">Login</h1>
              </div>
              <div className="mb-4">
                <input
                  className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              
              <button className="primary-btn w-full mb-3">Login</button>
            </CardBody>
            <CardFooter className="pt-0 justify-center">

              {!!loginUrl && (
                <a href={loginUrl} className="w-full flex items-center justify-center gap-2 border p-2 rounded-md mb-3">
                    <img 
                      src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" 
                      className="w-6 h-6" 
                      alt="Google Logo" 
                    />
                    <span>Sign in With Google</span>
                </a>
              )}

              <span className="text-blue-400">
                Belum punya akun? <Link to="/register">Register</Link>
              </span>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
