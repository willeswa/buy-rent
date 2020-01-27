import React, { useReducer, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { postReducer } from "./reducers/Auth";
import { UserContext } from "./utils/contexts";

function App() {
  const data = JSON.parse(localStorage.getItem("user" || null));
  const properties = JSON.parse(localStorage.getItem("properties" || null))
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))

  const [state, dispatch] = useReducer(postReducer, {
    payload: { properties: properties },
    isError: false,
    isLoading: false,
    error: null,
    user: data,
    isLoggedIn: isLoggedIn
  });
  console.log("Main app state", state);

  return (
    <UserContext.Provider value={dispatch}>
      <Navbar state={state} />
      <Footer />
    </UserContext.Provider>
  );
}

export default App;
