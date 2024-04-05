import { REMOVE_ROLE, SET_ROLE } from "../Actions/roleActions";

const initialState = JSON.parse(localStorage.getItem("role")) || {
  isAuth: false,
  admin: null,
  user: null,
  hotelowner: null,
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROLE: {
      const { roleType, roleData } = action.payload;
      const newState = { ...state, isAuth: true, [roleType]: roleData };
      localStorage.setItem("role", JSON.stringify(newState));
      return newState;
    }
    case REMOVE_ROLE: {
      localStorage.removeItem("role");
      return {
        isAuth: false,
        admin: null,
        user: null,
        hotelowner: null,
      };
    }
    default: {
      return state;
    }
  }
};

export { roleReducer };
