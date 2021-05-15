import { combineReducers } from "redux";
import alert from "./alert.reducer";
import { registerReducer, loginReducer } from "./auth.reducer";
import todo from "./todo.reducer";

export default combineReducers({
  alert,
  registerReducer,
  loginReducer,
  todo,
});
