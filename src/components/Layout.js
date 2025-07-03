// src/components/Layout.js
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />        {/* ←  every page renders here */}
    </>
  );
}
