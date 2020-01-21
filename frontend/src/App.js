import React, { useReducer, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import { postReducer } from "./reducers/Auth";
import { UserContext } from "./utils/contexts";

function App() {
  const data = JSON.parse(localStorage.getItem("user" || null));

  const [state, dispatch] = useReducer(postReducer, {
    payload: { properties: null },
    isError: false,
    isLoading: false,
    error: null,
    user: data,
    isLoggedIn: false
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
