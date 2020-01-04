import React, {useState} from 'react';
import logo from './logo.svg';
import Navbar from "./components/Navbar"
import SignupForm from "./components/Signup"
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
    <Navbar />
    </>
  );
}

export default App;
