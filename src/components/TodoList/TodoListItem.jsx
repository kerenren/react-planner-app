import React from "react";
import { List, Divider } from "antd";

function TodoListItem(props) {
  return (
    <div>
      <List bordered>{props.listItem}</List>
    </div>
  );
}

export default TodoListItem;
