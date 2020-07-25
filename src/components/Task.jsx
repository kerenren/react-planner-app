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
        {item.isEditing ? (
          <Input
            type="text"
            defaultValue={item.toDoTask}
            ref={props.inputRef}
            onKeyUp={(e) => props.handleKeyUp(e, item)}
            onClick={props.focusTextInput}
          />
        ) : (
          <div>{item.toDoTask} </div>
        )}

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
  });
  return renderList;
}

export default Task;
