import { Footer } from "../footer/Footer";
import { Navbar } from "../navbar/Navbar";
import { Sidebar } from "../sidebar/Sidebar";
import "./base.css";

const Base = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <div className="children-container">{children}</div>
      </div>
      <Footer />
    </>
  );
};

export { Base };
