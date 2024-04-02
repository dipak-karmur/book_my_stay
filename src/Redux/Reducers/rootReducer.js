import { combineReducers } from "redux";
import ProductReducer from "./ProductReducer";

const rootReducer = combineReducers({
    products:ProductReducer
})

export default rootReducer