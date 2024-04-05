import { SET_SEARCH_DATA } from "../Actions/SearchAction";


const initialState = JSON.parse(localStorage.getItem("searchData")) || {
  destination:'',
  date:{},
  options:{}
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_DATA: {
      const { destination,date,options } = action.payload;
      const newState = { ...state, destination:destination,date:date,options:options };
      localStorage.setItem("searchData", JSON.stringify(newState));
      return newState;
    }
    default: {
      return state;
    }
  }
};

export { searchReducer };
