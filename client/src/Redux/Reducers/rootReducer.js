import { combineReducers } from "redux";
import ProductReducer from "./ProductReducer";
import AppReducer from './AppReducer'

const rootReducer = combineReducers({
    products:ProductReducer,
    app:AppReducer
})

export default rootReducer