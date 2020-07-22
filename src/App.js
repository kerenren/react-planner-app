import React from "react";
import "./App.css";
import UserInput from "./components/UserInput.jsx";
import TodoListItem from "./components/TodoList/TodoListItem";
import "antd/dist/antd.css";
import DoneListItem from "./components/DoneList/DoneListItem";
import { List, Checkbox } from "antd";
import {
  CheckCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  StarOutlined,
  StarFilled,
  StarTwoTone,
} from "@ant-design/icons";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDos: [],
      dones: [],
    };
    this.toggleTodoItem = this.toggleTodoItem.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleOnNewTodo(newTOdo, oldDone) {
    if (typeof oldDone === "undefined") {
      this.setState((state) => {
        return {
          toDos: [newTOdo, ...state.toDos],
        };
      });
    } else {
      this.setState((state) => {
        return {
          toDos: [newTOdo, ...state.toDos],
          dones: [...state.dones].filter(
            (item) => item.toDoTask != oldDone.toDoTask
          ),
        };
      });
    }
  }

  handleOnNewDone(newDone, oldTodo) {
    console.log("new one", newDone);
    console.log("old todo", oldTodo);
    this.setState((state) => {
      return {
        toDos: [...state.toDos].filter(
          (item) => item.toDoTask != oldTodo.toDoTask
        ),
        dones: [newDone, ...state.dones],
      };
    });
    console.log(this.state);
  }

  toggleTodoItem(item) {
    const itemStatus = {
      toDoTask: item.toDoTask,
      finished: !item.finished,
      id: item.id,
    };

    return itemStatus;
  }

  handleToggle(item) {
    console.log("old item", item);
    let newItem = this.toggleTodoItem(item);
    console.log("new item", newItem);
    newItem.finished
      ? this.handleOnNewDone(newItem, item)
      : this.handleOnNewTodo(newItem, item);
  }

  render() {
    const handleToggle = this.handleToggle;

    let listItem = this.state.toDos.map(function (item) {
      return (
        <List.Item key={item["id"]}>
          <Checkbox
            onChange={() => handleToggle(item)}
            defaultChecked={item.finished}
            value={item.finished}
          />

          {"  item id:" + item["id"]}
          {item["toDoTask"]}

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
      <div className="App">
        <UserInput onNewToDO={(newTodo) => this.handleOnNewTodo(newTodo)} />
        <TodoListItem
          updateTodoItem={this.updateTodoItem}
          listItem={listItem}
        />
        <DoneListItem updateTodoItem={this.updateTodoItem} />
      </div>
    );
  }
}

export default App;
