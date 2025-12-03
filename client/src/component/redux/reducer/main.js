import { productReducer } from "./productreducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  getproductdata: productReducer,
});

export default rootReducer;