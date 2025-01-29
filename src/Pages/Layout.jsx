import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PowerIcon,
  HomeIcon,
  Squares2X2Icon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import Swal from "sweetalert2";

export default function Layout() {
  const location = useLocation();
  const { token, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();

    const res = await fetch("/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logout success",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    } else {
      console.log(data);
    }
  }

  const [summary, setSummary] = useState([]);

  async function getSummary() {
    const res = await fetch("/api/todos/summary", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    // console.log(data);

    if (res.ok) {
      setSummary(data);
      // console.log(data);
    }
  }

  useEffect(() => {
    getSummary();
  
    const interval = setInterval(() => {
      getSummary();
    }, 5000);
  
    return () => clearInterval(interval); 
  }, []);

  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Card className="h-full w-64 p-4 shadow-xl shadow-blue-gray-900/5">
          <div className="mb-2 p-4">
            <Typography variant="h5" color="blue-gray">
              Hai, Welcome Back
            </Typography>
          </div>
          <List>
            <Link
              to="/"
              className={
                location.pathname === "/" ? "bg-gray-100 rounded-md" : ""
              }
            >
              <ListItem>
                <ListItemPrefix>
                  <HomeIcon className="h-5 w-5" />
                </ListItemPrefix>
                Home
              </ListItem>
            </Link>
            <Link
              to="/todo"
              className={
                location.pathname === "/todo" ? "bg-gray-100 rounded-md" : ""
              }
            >
              <ListItem>
                <ListItemPrefix>
                  <Squares2X2Icon className="h-5 w-5" />
                </ListItemPrefix>
                To Do
                <ListItemSuffix>
                  <Chip
                    value={summary.pending > 0 ? summary.pending : '0'}
                    size="sm"
                    variant="ghost"
                    color="blue-gray"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
            </Link>
            {/* <Link
              to="/completed"
              className={
                location.pathname === "/completed"
                  ? "bg-gray-100 rounded-md"
                  : ""
              }
            >
              <ListItem>
                <ListItemPrefix>
                  <CheckCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Completed
                <ListItemSuffix>
                  <Chip
                    value={summary.completed > 0 ? summary.completed : '0'}
                    size="sm"
                    variant="ghost"
                    color="blue-gray"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
            </Link> */}
            <form onSubmit={handleLogout}>
              <button type="submit" className="w-full">
                <ListItem className="text-red-500">
                  <ListItemPrefix>
                    <PowerIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Log Out
                </ListItem>
              </button>
            </form>
          </List>
        </Card>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}
