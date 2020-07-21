import React from "react";
import { List, Checkbox, Input, Typography, Divider } from "antd";
import {
  CheckCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  StarOutlined,
  StarFilled,
  StarTwoTone,
} from "@ant-design/icons";

function TodoListItem(props) {
  const data = props.todoList;

  
  function toggleTodoItem(count, todo) {
    props.updateTodoItem(count, { todo, finished: !todo.finished });
  }

  let count = 0;
  let li = data.map((item) => {
    return (
      <List.Item key={(count += 1)}>
        <Checkbox
          onChange={() => toggleTodoItem(count, item)}
          checked={item.finished}
          // value={item.finished}
        />
        {item}
        <EditOutlined
          type="edit"
          theme="filled"
          // onClick={this.toggleEditing}
        />
        <DeleteOutlined
          type="close-circle"
          theme="filled"
          // onClick={() => removeTodoItem(item.id)}
        />
        <StarOutlined />
      </List.Item>
    );
  });

  return (
    <div>
      <Divider orientation="left">To Do List</Divider>
      <List bordered>{li}</List>
    </div>
  );
}

export default TodoListItem;
