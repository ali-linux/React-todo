import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, updateTodo } from "../../redux/actions/todo.action";
import { Spin, Empty, Collapse, Popconfirm, Input, Button, Modal } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";
import "./todoList.css";
import { deleteTodo } from "../../redux/actions/todo.action";
import { setAlert } from "../../redux/actions/alert.action";
const TodoList = () => {
  const [addTodo, setAddTodo] = useState({
    _id: 0,
    title: "",
    description: "",
  });
  const dispatch = useDispatch();
  const { todoList, loading } = useSelector((state) => state.todo);
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);
  const { TextArea } = Input;
  const { Panel } = Collapse;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const { _id, title, description } = addTodo;

  const handleOk = () => {
    if (title.length === 0) {
      dispatch(setAlert("title should not be empty", "danger"));
    } else {
      setIsModalVisible(false);
      dispatch(updateTodo(_id, title, description));
    }
  };

  const handleCancel = () => {
    setAddTodo({ title: "", description: "" });
    setIsModalVisible(false);
  };

  const onChange = (e) => {
    setAddTodo({ ...addTodo, [e.target.name]: e.target.value });
  };
  const editBtn = (_id, title, description) => (
    <Fragment>
      <EditOutlined
        className="todo-icon"
        style={{ margin: " 0 20px", fontSize: "24px", color: "green" }}
        // onClick={deleteHandler()}
        onClick={(e) => {
          e.stopPropagation();
          setAddTodo({ _id, title, description });
          showModal();
        }}
      />
      <Popconfirm
        title="Are you sure to delete this task?"
        okText="Yes"
        cancelText="No"
        onConfirm={(e) => {
          e.stopPropagation();

          dispatch(deleteTodo(_id));
        }}
        onCancel={(e) => {
          e.stopPropagation();
        }}
      >
        <DeleteFilled
          className="todo-icon"
          style={{ fontSize: "24px", color: "red" }}
          // onClick={deleteHandler()}
          onClick={(e) => {
            e.stopPropagation();

            // dispatch(deleteTodo(id));
          }}
        />
      </Popconfirm>
    </Fragment>
  );

  return (
    <div>
      <Modal
        title="Add TODO"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
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
      {loading ? (
        <Spin />
      ) : todoList.length !== 0 ? (
        <Collapse
          style={{ marginBottom: "1.6rem" }}
          bordered={true}
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          className="site-collapse-custom-collapse"
        >
          {todoList.map((todo) => (
            <Fragment>
              <Panel
                header={todo.title}
                key={todo._id}
                extra={editBtn(todo._id, todo.title, todo.description)}
                className="site-collapse-custom-panel"
              >
                <p>{todo.description}</p>
              </Panel>
            </Fragment>
          ))}
        </Collapse>
      ) : (
        <Empty description="Your TODO List is empty :( " />
      )}
    </div>
  );
};

export default TodoList;
