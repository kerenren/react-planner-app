import React from "react";
import "./App.css";
import UserInput from "./components/UserInput.jsx";
import TodoListItem from "./components/TodoList/TodoListItem";
import "antd/dist/antd.css";
import DoneListItem from "./components/DoneList/DoneListItem";
import { List, Checkbox } from "antd";
import {
  CheckCircleOutlined,
  EditTwoTone,
  DeleteTwoTone,
  StarOutlined,
  StarFilled,
  StarTwoTone,
} from "@ant-design/icons";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoFavorites: [],
      toDos: [],
      doneFavorites: [],
      dones: [],
    };
    this.toggleTodoItem = this.toggleTodoItem.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.removeTodoItem = this.removeTodoItem.bind(this);
    this.toggleIsFavorite = this.toggleIsFavorite.bind(this);
  }

  handleSort() {
    this.setState((state) => {
      return {
        toDoFavorites: state.toDoFavorites.sort((x, y) => x.id - y.id),
        toDos: state.toDos.sort((x, y) => x.id - y.id),
        doneFavorites: state.doneFavorites.sort((x, y) => x.id - y.id),
        dones: state.dones.sort((x, y) => x.id - y.id),
      };
    });
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
      isFavorite: item.isFavorite,
    };

    return itemStatus;
  }

  handleToggle(item) {
    let newItem = this.toggleTodoItem(item);
    newItem.finished
      ? this.handleOnNewDone(newItem, item)
      : this.handleOnNewTodo(newItem, item);
  }

  removeTodoItem(itemId) {
    this.setState((state) => {
      return {
        toDoFavorites: state.toDoFavorites.filter((item) => item.id !== itemId),
        toDos: state.toDos.filter((item) => item.id !== itemId),
        dones: state.dones.filter((item) => item.id !== itemId),
        doneFavorites: state.doneFavorites.filter((item) => item.id !== itemId),
      };
    });
  }

  toggleIsFavorite(item) {
    const favoriteItem = {
      toDoTask: item.toDoTask,
      finished: item.finished,
      id: item.id,
      isFavorite: !item.isFavorite,
    };
    favoriteItem.finished
      ? this.setState((state) => {
          return {
            doneFavorites: [favoriteItem, ...state.doneFavorites],
            dones: state.dones.filter((item) => item.id !== favoriteItem.id),
          };
        })
      : this.setState((state) => {
          return {
            toDoFavorites: [favoriteItem, ...state.toDoFavorites],
            toDos: state.toDos.filter((item) => item.id !== favoriteItem.id),
          };
        });
    this.handleSort();
  }

  render() {
    const handleToggle = this.handleToggle;
    const removeTodoItem = this.removeTodoItem;
    const toggleIsFavorite = this.toggleIsFavorite;

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

            <EditTwoTone
              type="edit"
              theme="filled"
              // onClick={this.toggleEditing}
            />
            <DeleteTwoTone
              type="close-circle"
              theme="filled"
              onClick={() => removeTodoItem(item.id)}
            />
            {item.isFavorite ? (
              <StarFilled onClick={() => toggleIsFavorite(item)} />
            ) : (
              <StarTwoTone onClick={() => toggleIsFavorite(item)} />
            )}
          </List.Item>
        );
      });
      return listElement;
    }

    return (
      <div className="App">
        <UserInput onNewToDO={(newTodo) => this.handleOnNewTodo(newTodo)} />
        <TodoListItem listItem={listItem(this.state.toDoFavorites)} />
        <TodoListItem listItem={listItem(this.state.toDos)} />
        <DoneListItem listItem={listItem(this.state.doneFavorites)} />
        <DoneListItem listItem={listItem(this.state.dones)} />
      </div>
    );
  }
}

export default App;
