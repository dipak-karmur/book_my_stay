import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Login from "./Login";
import Navbar from "./Navbar";

const HOC = (HomeComp) => {
  
   return (props)=> {
      const [auth, setAuth] = useState(true);

      if (auth) {
        return (
          <>
           
            <Navbar/>
            <HomeComp {...props} />
          </>
        );
      } else {
        return (
          <>
            <Login/>
          </>
        );
      }
    }
  
   
};

export default HOC;
