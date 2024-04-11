import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function Layout() {
  return (
    <div>
      <Navbar />
      <div className="pb-5">
      <Outlet />
      </div>
      
      <Footer />
    </div>
  );
}

export default Layout;
