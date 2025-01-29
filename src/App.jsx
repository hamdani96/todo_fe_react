import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Todo from "./Pages/Todo";
import Completed from "./Pages/Completed";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import GoogleCallback from "./Pages/Auth/GoogleCallback";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext";

export default function App() {
  const { user } = useContext(AppContext);

  return <BrowserRouter>
    <Routes>
  {/* Jika user belum login, langsung tampilkan Register tanpa Layout */}
  {!user ? (
    <Route path="/" element={<Login />} />
  ) : (
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/completed" element={<Completed />} />
    </Route>
  )}

  {/* Route Auth (Tanpa Layout) */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/auth/google" element={<GoogleCallback />}></Route>
</Routes>
  </BrowserRouter>
}