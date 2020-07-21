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

  return (
    <div>
      <Divider orientation="left">To Do List</Divider>
      <List
        //   header={<div>To Do List</div>}
        //   footer={<div>Footer</div>}
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Checkbox />
            <Typography.Text mark></Typography.Text> {item}
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
        )}
      />
    </div>
  );
}

export default TodoListItem;
