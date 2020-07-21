import React from "react";
import { List, Checkbox, Typography, Divider } from "antd";
import {
  CheckCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  StarOutlined,
  StarFilled,
  StarTwoTone,
} from "@ant-design/icons";

function DoneListItem(props) {
  let data = props.doneList;
  data = ["run", "buy wine", "watch movie"];

  function toggleTodoItem(count, todo) {
    console.log(count, todo);
    props.updateTodoItem(count, { todo, finished: false });
  }

  let count = 0;
  let li = data.map((taskItem) => {
    return (
      <List.Item key={(count += 1)}>
        <Checkbox
        //   checked={!taskItem.finished}
          onChange={() => toggleTodoItem(count, taskItem)}
          defaultChecked={true}
        />
        {taskItem}
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
      <Divider orientation="left">Done</Divider>
      <List>
        {console.log(li)} {li}
      </List>
    </div>
  );
}

export default DoneListItem;
