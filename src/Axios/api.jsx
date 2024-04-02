import axios from 'axios'
import React from 'react';




const API = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/users",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    timeout: 3000,
  });


  






  export default API
