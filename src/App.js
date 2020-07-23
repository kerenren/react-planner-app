import React from "react";
import "./App.css";
import UserInput from "./components/UserInput.jsx";
import TodoListItem from "./components/TodoList/TodoListItem";
import "antd/dist/antd.css";
import DoneListItem from "./components/DoneList/DoneListItem";
import { List, Checkbox, Divider, Input } from "antd";
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
    this.toggleEditing = this.toggleEditing.bind(this);
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
      newTOdo.isFavorite
        ? this.setState((state) => {
            return {
              toDoFavorites: [newTOdo, ...state.toDoFavorites],
              doneFavorites: [...state.doneFavorites].filter(
                (item) => item.id !== oldDone.id
              ),
            };
          })
        : this.setState((state) => {
            return {
              toDos: [newTOdo, ...state.toDos],
              dones: [...state.dones].filter((item) => item.id !== oldDone.id),
            };
          });
    }
    this.handleSort();
  }

  handleOnNewDone(newDone, oldTodo) {
    newDone.isFavorite
      ? this.setState((state) => {
          return {
            toDoFavorites: [...state.toDoFavorites].filter(
              (item) => item.id !== oldTodo.id
            ),
            doneFavorites: [newDone, ...state.doneFavorites],
          };
        })
      : this.setState((state) => {
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
      isEditing: item.isEditing,
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
      isEditing: item.isEditing,
    };
    favoriteItem.isFavorite
      ? favoriteItem.finished
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
          })
      : favoriteItem.finished
      ? this.setState((state) => {
          return {
            dones: [favoriteItem, ...state.dones],
            doneFavorites: state.doneFavorites.filter(
              (item) => item.id !== favoriteItem.id
            ),
          };
        })
      : this.setState((state) => {
          return {
            toDos: [favoriteItem, ...state.toDos],
            toDoFavorites: state.toDoFavorites.filter(
              (item) => item.id !== favoriteItem.id
            ),
          };
        });
    this.handleSort();
  }

  toggleEditing(item) {
    const editItem = {
      toDoTask: item.toDoTask,
      toDoTask: item.toDoTask,
      finished: item.finished,
      id: item.id,
      isFavorite: item.isFavorite,
      isEditing: !item.isEditing,
    };
    switch (editItem.isFavorite) {
      case true:
        editItem.finished
          ? this.setState((state) => {
              return {
                doneFavorites: state.doneFavorites.filter(
                  (item) => item.id !== editItem.id
                ),
                doneFavorites: [editItem, ...state.doneFavorites],
              };
            })
          : this.setState((state) => {
              return {
                toDoFavorites: state.toDoFavorites.filter(
                  (item) => item.id !== editItem.id
                ),
                toDoFavorites: [editItem, ...state.toDoFavorites],
              };
            });
        break;
      case false:
        editItem.finished
          ? this.setState((state) => {
              return {
                dones: state.dones.filter((item) => item.id !== editItem.id),
                dones: [editItem, ...state.dones],
              };
            })
          : this.setState((state) => {
              filteredToDos = state.toDos.filter(
                (item) => item.id !== editItem.id
              );
              return {
                toDos: [editItem, ...filteredToDos],
              };
            });
        break;
    }
  }

  render() {
    const handleToggle = this.handleToggle;
    const removeTodoItem = this.removeTodoItem;
    const toggleIsFavorite = this.toggleIsFavorite;
    const toggleEditing = this.toggleEditing;

    function listItem(list) {
      const listElement = list.map(function (item) {
        return (
          <List.Item key={item["id"]}>
            <Checkbox
              onChange={() => handleToggle(item)}
              defaultChecked={item.finished}
            />
            <Input
              type="text"
              disabled={!item.isEditing}
              value={item["toDoTask"]}
            />

            <EditTwoTone
              type="edit"
              theme="filled"
              onClick={() => toggleEditing(item)}
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
        <Divider orientation="left">To Do List</Divider>
        <TodoListItem listItem={listItem(this.state.toDoFavorites)} />
        <TodoListItem listItem={listItem(this.state.toDos)} />
        <Divider orientation="left">Done</Divider>
        <DoneListItem listItem={listItem(this.state.doneFavorites)} />
        <DoneListItem listItem={listItem(this.state.dones)} />
      </div>
    );
  }
}

export default App;
