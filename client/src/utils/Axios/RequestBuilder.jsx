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

  export const addCategory = async (category) => {
    try {
      const response = await API.post("/categories", category);
     
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

  export const updateBookingWithStatus = async (booking) => {
    try {
      const response = await API.patch(`/bookings/${booking.id}`, booking);
     
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
  
  export const addHotelOwner = async (hotelOwner) => {
    try {
      const response = await API.post("/hotelowner", hotelOwner);
     
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

  export const getHotelOwners = async () => {
    try {
      const response = await API.get("/hotelowner");
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

  export const updateBooking = async (booking) => {
    try {
      const response = await API.post("/hotelowner", hotelOwner);
     
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

  export const DeleteBooking = async (id) => {
    try {
      const res = await API.delete(`bookings/${id}`);
      return {
        success: true,
        data: res.data,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  };

  export const DeleteCategory = async (id) => {
    try {
      const res = await API.delete(`categories/${id}`);
      return {
        success: true,
        data: res.data,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  };
  
  
  export const DeleteUser = async (id) => {
    try {
      const res = await API.delete(`users/${id}`);
      return {
        success: true,
        data: res.data,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  };
  export const DeleteHotelOwner = async (id) => {
    try {
      const res = await API.delete(`hotelowner/${id}`);
      return {
        success: true,
        data: res.data,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  };

  export const updateUserFromAdmin = async (id, userData) => {
    try {
        const res = await API.patch(`/users/${id}`, userData);
        return {
            success: true,
            data: res.data,
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
  export const updateCategory = async (id, categoryData) => {
    try {
        const res = await API.patch(`/categories/${id}`, categoryData);
        return {
            success: true,
            data: res.data,
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
  export const updateHotelOwnerFromAdmin = async (id, ownerData) => {
    try {
        const res = await API.patch(`/hotelowner/${id}`, ownerData);
        return {
            success: true,
            data: res.data,
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

  export const updateHotelFromAdmin = async (id, hotelData) => {
    try {
        const res = await API.patch(`/hotels/${id}`, hotelData);
        return {
            success: true,
            data: res.data,
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
  
  export const DeleteHotel = async (id) => {
    try {
      const res = await API.delete(`hotels/${id}`);
      return {
        success: true,
        data: res.data,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  };

