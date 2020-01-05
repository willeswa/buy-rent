import React from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import SingupForm from "./Signup";
import LandingPage from "./Home";
import Login from "./Login";
import history from "../utils/history";

export default () => {
  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-blue p-3 sticky-top">
          <a className="navbar-brand" href="/">
            <span className="first-nb">BuyRent</span>
            <span className="second-nb">Bungoma</span>
          </a>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto ">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item ml-3 mr-3">
                <Link className="nav-link" to="/properties">
                  Find Property
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/new-property">
                  Sell Property
                </Link>
              </li>
              
            </ul>
            <ul className="nav navbar-nav float-right">
            <li className="nav-item">
                <Link className="nav-link btn btn-sm" to="/signup" id="signup">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item ml-3">
                <Link className="nav-link btn btn-sm mr" to="/login" id="login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route path="/signup" component={SingupForm} />
           
          <Route path="/login" component={Login} />
          <Route path="/" component={LandingPage}/>
        </Switch>
      </div>
    </Router>
  );
};
