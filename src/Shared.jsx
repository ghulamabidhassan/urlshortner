import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Shared = () => {
  return (
    <>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default Shared;
