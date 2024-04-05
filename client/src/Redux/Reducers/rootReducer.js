import { combineReducers } from "redux";
import ProductReducer from "./ProductReducer";
import AppReducer from "./AppReducer";
import { roleReducer } from "./roleReducer";
import { searchReducer } from "./searchReducer"

const rootReducer = combineReducers({
  app: AppReducer,
  products: ProductReducer,
  role: roleReducer,
  searchData: searchReducer,
});

export default rootReducer;
