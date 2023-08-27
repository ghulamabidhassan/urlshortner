import { FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./Context";

const Navbar = () => {
  const { dark, darkMode } = useGlobalContext();

  return (
    <nav className={`${dark ? "navbar dark-navbar" : "navbar "}`}>
      <div>
        <Link className="react-links" to="/">
          <h2 className="logo">URL Shortner</h2>
        </Link>
      </div>
      <div>
        <ul className="menus">
          <li>
            {dark ? (
              <FaSun onClick={darkMode} className="icon" />
            ) : (
              <FaMoon onClick={darkMode} className="icon" />
            )}
          </li>
          <Link className="react-links" to="/">
            <li className="home">Home</li>
          </Link>
          <Link className="react-links" to="/stats">
            <li>Stats</li>
          </Link>
          <li>
            <a
              className="github"
              target="blank"
              href="https://github.com/ghulamabidhassan/urlshortner"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
