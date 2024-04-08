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
  
  export const addBooking = async (booking) => {
    try {
      const response = await API.post("/bookings", booking);
     
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

  export const updateHotel = async (hotelData) => {
    try {
      const response = await API.patch(`/hotels/${hotelData.id}`, hotelData);
     
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


  export const getCategories = async () => {
    try {
      const response = await API.get("/categories");
      
      
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
  
  export const getBookings = async () => {
    try {
      const response = await API.get("/bookings");
      
      
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
  