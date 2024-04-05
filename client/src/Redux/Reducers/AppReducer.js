const initialState = {
  loader: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADER":
      return { loader: action.payload };

    default:
      return state;
  }
};

export default AppReducer;
