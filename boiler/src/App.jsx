import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import Login from "./Components/Login";
import PublicRoute from "./private-public-route/PublicRoute";
import PrivateRoute from "./private-public-route/PrivateRoute";

function App() {
  const [count, setCount] = useState(0);
  const isAuth = false;

  return (
    
    
    <Routes>
      <Route path="/login" element={isAuth ? <Navigate to="/" /> : <Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={isAuth ? <Cart /> : <Navigate to="/login" />} />
      <Route path="*" element={<div><h1>No content Found !!</h1></div>} />
    </Routes>
  
   
  );
}

export default App;
