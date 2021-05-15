import { GET_TODO_FAIL, GET_TODO_SUCCESS } from "../constants/todo.constants";
const initialState = {
  todoList: null,
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
    case GET_TODO_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
