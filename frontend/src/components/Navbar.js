import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SingupForm from "./Signup";
import LandingPage from "./Home";

export default () => {
  return (
    <Router>
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
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route path="/signup">
            <SingupForm />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
