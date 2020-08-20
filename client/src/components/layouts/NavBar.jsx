import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import GithubContext from "../../context/Github/githubContext";

const NavBar = ({ icon, title }) => {
  const githubContext = useContext(GithubContext);
  const { isLoggedIn, logoutUser } = githubContext;
  return (
    <nav className="navbar bg-primary">
      <h1>
        <a href={ isLoggedIn ? "/" : "/login" }>
          {" "}
          <i className={icon} /> {title}
        </a>
      </h1>
      <ul>
        { !isLoggedIn &&<li>
          <Link to="/login">Login</Link>
        </li>}
        { isLoggedIn &&<li>
          <Link to="/">Home</Link>
        </li>}
        <li>
          <Link to="/about">About</Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link
              to="/login"
              onClick={() => {
                logoutUser();
              }}
            >
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

NavBar.defaultProps = {
  title: "Github App",
  icon: "fab fa-github",
};

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default NavBar;
