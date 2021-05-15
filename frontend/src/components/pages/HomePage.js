import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../redux/actions/alert.action";
import TodoList from "../TodoList";

const HomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.loginReducer
  );
  // useEffect(() => {}, []);
  if (!isAuthenticated) history.push("login");
  return (
    <div>
      <h1>Home Page</h1>
      <div className="todos">
        <TodoList />
      </div>
    </div>
  );
};

export default HomePage;
