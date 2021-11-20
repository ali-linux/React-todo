import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Input, Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../redux/actions/alert.action";
import { addTodoFunc } from "../../redux/actions/todo.action";
import TodoList from "../todo/TodoList";
import Alert from "../layout/Alert";
import "./homePage.css";
const HomePage = () => {
  const [addTodo, setAddTodo] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const { title, description } = addTodo;
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.loginReducer
  );

  if (!isAuthenticated) history.push("login");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { TextArea } = Input;
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (title.length === 0) {
      dispatch(setAlert("title is required", "danger"));
    } else {
      setIsModalVisible(false);
      dispatch(addTodoFunc(title, description, userInfo.id));
    }
  };

  const handleCancel = () => {
    setAddTodo({ title: "", description: "" });
    setIsModalVisible(false);
  };

  const onChange = (e) => {
    setAddTodo({ ...addTodo, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="todos">
        <div className="todo-heading">
          <div>
            <h1> Your TODOS :|</h1>
          </div>
          <div>
            <Button type="primary" onClick={showModal}>
              Add TODO
            </Button>
            <Modal
              title="Add TODO"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Alert />
              <Input
                placeholder="*Title"
                allowClear
                value={title}
                onChange={onChange}
                name="title"
              />
              <br />
              <br />
              <TextArea
                placeholder="textarea with clear icon"
                name="description"
                allowClear
                value={description}
                onChange={onChange}
              />
            </Modal>
          </div>
        </div>
        <TodoList />
      </div>
    </div>
  );
};

export default HomePage;
