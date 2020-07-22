import React from "react";
import { List, Checkbox, Input, Typography, Divider } from "antd";


function TodoListItem(props) {
  // const data = props.todoList;

  

  return (
    <div>
      <Divider orientation="left">To Do List</Divider>
      <List bordered>{props.listItem}</List>
    </div>
  );
}

export default TodoListItem;
