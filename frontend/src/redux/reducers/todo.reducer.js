import {
  DELETE_TODO_SUCCESS,
  GET_TODO_FAIL,
  GET_TODO_SUCCESS,
  POST_TODO_FAIL,
  POST_TODO_SUCCESS,
  PUT_TODO_FAIL,
  PUT_TODO_SUCCESS,
} from "../constants/todo.constants";
const initialState = {
  todoList: [],
  loading: true,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TODO_SUCCESS:
      return {
        todoList: action.payload.result,
        loading: false,
      };
    case POST_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todoList: [...state.todoList, action.payload],
      };
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todoList: state.todoList.filter((todo) => todo.id !== action.payload),
      };
    case PUT_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todoList: state.todoList.map((todo) => {
          if (todo.id === action.payload.id) {
            return action.payload;
          }
          return todo;
        }),
      };
    case PUT_TODO_FAIL:
    case POST_TODO_FAIL:
    case GET_TODO_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
