import React, { useState, useEffect } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import SingupForm from "../auth/Signup";
import LandingPage from "../Home";
import Login from "../auth/Login";
import Dashboard from "../auth/Dashboard";
import history from "../../utils/history";
import { Avatar } from "antd";
import Properties from "../Properties";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { NavItem, RightNavbar } from "./NavItem";
import { withUserAuthentication } from "../../utils/HighOrder";

const Authenticated = withUserAuthentication(RightNavbar);

export default () => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const handleLogout = () => {
    console.log('hey hey')
    localStorage.clear()
    setUser(null)
    history.push('/')
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setToken(JSON.parse(localStorage.getItem("token")));
  }, []);

  console.log(user)

  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-blue p-3 sticky-top">
          <a className="navbar-brand" href="/">
            <span className="first-nb">
              <FontAwesomeIcon icon={faHome} size="1x" color="#20A348" />
              &nbsp;BuyRent
            </span>
            <span className="second-nb">Bungoma</span>
          </a>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto ">
              <NavItem text="Home" link="/" />
              <NavItem text="Buy Property" link="/properties" />
              <NavItem text="Sell Property" link={user ? `/dashboard/users/${user.user.id}` : `/login`} />
            </ul>

            <Authenticated user={user} onClick={handleLogout}/>
          </div>
        </nav>
        <Switch>
          <Route path="/properties" component={Properties} />
          <Route path="/signup" component={SingupForm} />

          <Route
            path="/dashboard/users/:id"
            render={props => <Dashboard {...props} />}
          />
          <Route path="/login" component={Login} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </div>
    </Router>
  );
};


