import { Footer } from "../footer/Footer";
import { Navbar } from "../navbar/Navbar";
import { Sidebar } from "../sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./base.css";

const Base = ({ children }) => {
  const { pathname } = useLocation();
  const sidebarRestrictedRoutes = ["/signin", "/signup", "/"];
  return (
    <>
      <Toaster />
      <Navbar />
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
