import axios from "axios";
import React from "react";

const API = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 3000,
});

export const getUsers = async () => {
  try {
    const response = await API.get("/users");
    
    
    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      error: error.message,
    };
  }
};

export const addUser = async (user) => {
  try {
    const response = await API.post("/users", user);
   
    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
}

export default API;
