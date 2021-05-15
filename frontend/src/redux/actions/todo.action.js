import axios from "axios";
import { setAlert } from "../actions/alert.action";
import { GET_TODO_SUCCESS, GET_TODO_FAIL } from "../constants/todo.constants";
export const getTodos = () => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("clientInfo")).token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const { data } = await axios.get("/api/todo", config);
    dispatch({
      type: GET_TODO_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_TODO_FAIL,
    });
    dispatch(setAlert("Failed to fetch todos "), "warning");
  }
};
