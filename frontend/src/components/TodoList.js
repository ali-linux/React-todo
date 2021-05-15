import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../redux/actions/todo.action";

const TodoList = () => {
  const dispatch = useDispatch();
  const { todoList } = useSelector((state) => state.todo);
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);
  return (
    <div>
      <h1>LIST of TODO</h1>
      {todoList &&
        todoList.map((todo) => <h3 key={todo.id}>{todo.description}</h3>)}
    </div>
  );
};

export default TodoList;
