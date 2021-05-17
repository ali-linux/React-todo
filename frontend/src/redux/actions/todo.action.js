import axios from "axios";
import { setAlert } from "../actions/alert.action";
import { LOGOUT } from "../constants/auth.constants";
import {
  GET_TODO_SUCCESS,
  GET_TODO_FAIL,
  POST_TODO_FAIL,
  POST_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  PUT_TODO_SUCCESS,
} from "../constants/todo.constants";
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
    dispatch(setAlert(err.response.status), "danger");
  }
};

export const addTodoFunc =
  (title, description, user_id) => async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("clientInfo")).token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      };
      const body = JSON.stringify({ title, description, user_id });
      console.log(body);
      const { data } = await axios.post("/api/todo/add", body, config);
      dispatch({
        type: POST_TODO_SUCCESS,
        payload: data.todo,
      });
    } catch (err) {
      dispatch({
        type: POST_TODO_FAIL,
      });
      console.log(err);
      dispatch(setAlert(err.response.data), "danger");
    }
  };

export const deleteTodo = (id) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("clientInfo")).token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    await axios.post("/api/todo/delete", { id: id }, config);
    dispatch({
      type: DELETE_TODO_SUCCESS,
      payload: id,
    });
    dispatch(setAlert("Todo deleted successfully", "success"));
  } catch (err) {
    console.log(err.response.data);
    dispatch(setAlert("ali", "danger"));
  }
};

export const updateTodo = (id, title, description) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("clientInfo")).token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const body = JSON.stringify({ id, title, description });
    const { data } = await axios.post("/api/todo/update", body, config);
    dispatch({
      type: PUT_TODO_SUCCESS,
      payload: {
        id,
        title,
        description,
      },
    });
    dispatch(setAlert(data.msg, "success"));
  } catch (err) {
    console.log(err);
    dispatch(setAlert("could not update :(", "danger"));
  }
};
