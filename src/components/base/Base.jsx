import { useState, useEffect } from "react";
import { Footer } from "../footer/Footer";
import { Navbar } from "../navbar/Navbar";
import { NavAside } from "../navbar/NavAside";
import { Sidebar } from "../sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./base.css";

const Base = ({ children }) => {
  const [navAside, setNavAside] = useState(false);
  const { pathname } = useLocation();
  const sidebarRestrictedRoutes = ["/signin", "/signup", "/"];

  useEffect(() => {
    setNavAside(false);
  }, [pathname]);

  return (
    <>
      <Toaster />
      <Navbar navAside={navAside} setNavAside={setNavAside} />
      <NavAside navAside={navAside} setNavAside={setNavAside} />
      <div
        className={
          sidebarRestrictedRoutes.includes(pathname) ? "main-container-secondary" : "main-container"
        }
      >
        {sidebarRestrictedRoutes.includes(pathname) ? null : <Sidebar />}
        <div className="children-container">{children}</div>
      </div>
      {pathname === "/" ? null : <Footer />}
    </>
  );
};

export { Base };
