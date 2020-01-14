import React from "react";
import { Link } from "react-router-dom";

export const NavItem = ({ text, link }) => (
  <li className="nav-item active">
    <Link className="nav-link" to={link}>
      {text}
    </Link>
  </li>
);

export const RightNavbar = ({ login, signup, loginLink, signupLink, logout, logoutText }) => (
  <ul className="navbar-nav">
    <li className="nav-item">
      <Link className="nav-link" to={loginLink}>
        {login}
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to={signupLink}>
        {signup}
      </Link>
    </li>
    <li className="nav-item">
      <Link onClick={logout} className="nav-link">{logoutText}</Link>
    </li>
  </ul>
);
