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
import {UserContext} from "../../utils/contexts";
import types from "../../reducers/actionTypes"




const Authenticated = withUserAuthentication(RightNavbar);

export default ({state}) => {

  const dispatch = useContext(UserContext)
  

  const handleLogout = () => {
    dispatch({type: types.logoutUser, user: null})
    localStorage.clear()
    window.location.replace('/properties')
  }


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
                  <NavItem text="Sell Property" link={state.user ? `/dashboard/users/${state.user.user.id}` : `/login`} />
                </ul>
    
                <Authenticated user={state.user} onClick={handleLogout}/>
              </div>
            </nav>
            <Switch>
              <Route path="/properties" component={Properties} />
              <Route path="/signup" component={SingupForm} />
    
              <Route
                path="/dashboard/users/:id"
                render={props => <Dashboard {...props} state={state}/>}
              />
              <Route path="/login"
              render={() => <Login state={state} />}/>
              <Route path="/" component={LandingPage} />
            </Switch>
          </div>
        </Router>)

};


