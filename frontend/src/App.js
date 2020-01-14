import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import UserContextWrapper from "./components/ContextWrapper";
import "./App.css";

function App() {
  return (
    <UserContextWrapper>
      <Navbar />
      <Footer />
    </UserContextWrapper>
  );
}

export default App;
