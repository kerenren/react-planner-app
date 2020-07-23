import React from "react";
import {
  CheckCircleOutlined,
  EditTwoTone,
  DeleteTwoTone,
  StarOutlined,
  StarFilled,
  StarTwoTone,
} from "@ant-design/icons";
import { List, Checkbox, Input } from "antd";

function Task(props) {

  
  const renderList = props.list.map(function (item) {
    return (
      <List.Item key={item["id"]}>
        <Checkbox
          onChange={() => props.handleToggle(item)}
          defaultChecked={item.finished}
        />
        <Input
          type="text"
          disabled={!item.isEditing}
          value={item.toDoTask}
          onKeyUp={(e) => props.handleKeyUp(e, item)}
          onChange={(e) => props.handleEdit(e,item)}
        />

        <EditTwoTone
          type="edit"
          theme="filled"
          onClick={() => props.toggleEditing(item)}
        />
        <DeleteTwoTone
          type="close-circle"
          theme="filled"
          onClick={() => props.removeTodoItem(item.id)}
        />
        {item.isFavorite ? (
          <StarFilled onClick={() => props.toggleIsFavorite(item)} />
        ) : (
          <StarTwoTone onClick={() => props.toggleIsFavorite(item)} />
        )}
      </List.Item>
    );
  })
return renderList

}

export default Task;
