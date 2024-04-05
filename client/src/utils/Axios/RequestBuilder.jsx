import API from "./api";

/// request handling of endpoint '/users'
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
  
  ///  request handling of endpoint '/hotels'
  
  export const getHotels = async () => {
    try {
      const response = await API.get("/hotels");
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
  
  export const addHotel = async (hotel) => {
    try {
      const response = await API.post("/hotels", hotel);
     
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
  

  