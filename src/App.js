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

  handleSort() {
    console.log("before", this.state);
    this.setState((state) => {
      return {
        toDos: state.toDos.sort((x, y) => x.id - y.id),
        dones: state.dones.sort((x, y) => x.id - y.id),
      };
    });
    console.log("after", this.state);
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
          dones: [...state.dones].filter((item) => item.id !== oldDone.id),
        };
      });
    }
    this.handleSort();
  }

  handleOnNewDone(newDone, oldTodo) {
    this.setState((state) => {
      return {
        toDos: [...state.toDos].filter((item) => item.id !== oldTodo.id),
        dones: [newDone, ...state.dones],
      };
    });
    this.handleSort();
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
    let newItem = this.toggleTodoItem(item);
    newItem.finished
      ? this.handleOnNewDone(newItem, item)
      : this.handleOnNewTodo(newItem, item);
  }

  render() {
    const handleToggle = this.handleToggle;

    function listItem(list) {
      const listElement = list.map(function (item) {
        return (
          <List.Item key={item["id"]}>
            <Checkbox
              onChange={() => handleToggle(item)}
              defaultChecked={item.finished}
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
      return listElement;
    }

    return (
      <div className="App">
        <UserInput onNewToDO={(newTodo) => this.handleOnNewTodo(newTodo)} />
        <TodoListItem
          updateTodoItem={this.updateTodoItem}
          listItem={listItem(this.state.toDos)}
        />
        <DoneListItem listItem={listItem(this.state.dones)} />
      </div>
    );
  }
}

export default App;
