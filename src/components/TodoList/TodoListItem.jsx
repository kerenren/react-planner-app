import React from "react";
import { List, Divider } from "antd";


function TodoListItem(props) {

  return (
    <div>
      <Divider orientation="left">To Do List</Divider>
      <List bordered>{props.listItem}</List>
    </div>
  );
}

export default TodoListItem;
