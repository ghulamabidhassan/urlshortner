import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useGlobalContext } from "./Context";

const Shared = () => {
  const { dark } = useGlobalContext();
  return (
    <>
      <div className="outer-container ">
        <Navbar />
        <Outlet />
        <footer>
          <h2 className={`${dark ? "copyright dark-middle" : "copyright "}`}>
            developed by
            <a
              className="abid-link"
              target="blank"
              href="https://www.linkedin.com/in/ghulamabidhassan/"
            >
              abid
            </a>
          </h2>
        </footer>
      </div>
    </>
  );
};

export default Shared;
