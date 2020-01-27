import React, { useContext } from "react";
import { Router, Switch, Route } from "react-router-dom";
import SingupForm from "../auth/Signup";
import LandingPage from "../Home";
import Login from "../auth/Login";
import Dashboard from "../auth/Dashboard";
import history from "../../utils/history";

import Properties from "../Properties";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { NavItem, RightNavbar } from "./NavItem";
import { withUserAuthentication } from "../../utils/HighOrder";
import { UserContext } from "../../utils/contexts";
import types from "../../reducers/actionTypes";
import { Land, Hostel, Stall, Office } from "../PropertyByType";

const Authenticated = withUserAuthentication(RightNavbar);

export default ({ state }) => {
  const dispatch = useContext(UserContext);

  const handleLogout = () => {
    dispatch({ type: types.logoutUser, user: null });
    localStorage.clear();
    history.push("/properties");
  };

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

          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobileNavbar"
            aria-controls="mobileNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobileNavbar">
            <ul className="navbar-nav mr-auto ">
              <NavItem text="Home" link="/" />
              <NavItem text="Buy Property" link="/properties" />
              <NavItem text="Sell Property" link="/dashboard/users/" />
            </ul>

            <Authenticated
              user={state.user}
              loggedin={state.isLoggedIn}
              onClick={handleLogout}
            />
          </div>
        </nav>
        <Switch>
          <Route
            path="/properties/lands"
            render={() => <Land endpoint="properties/lands" state={state} />}
          />
          <Route
            path="/properties/hostels"
            render={() => (
              <Hostel endpoint="properties/hostels" state={state} />
            )}
          />
          <Route
            path="/properties/stalls"
            render={() => <Stall endpoint="properties/stalls" state={state} />}
          />
          <Route
            path="/properties/offices"
            render={() => (
              <Office endpoint="properties/offices" state={state} />
            )}
          />
          <Route path="/properties" component={Properties} />
          <Route path="/signup" component={SingupForm} />

          <Route
            path="/dashboard/users/:id"
            render={props => <Dashboard {...props} state={state} />}
          />
          <Route path="/login" render={() => <Login state={state} />} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </div>
    </Router>
  );
};
