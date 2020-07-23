import React from "react";
import "./App.css";
import UserInput from "./components/UserInput.jsx";
import "antd/dist/antd.css";
import UserForm from "./components/UserForm";
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
      taskList: [],
    };
    this.toggleTodoItem = this.toggleTodoItem.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.removeTodoItem = this.removeTodoItem.bind(this);
    this.toggleIsFavorite = this.toggleIsFavorite.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handleSort(list) {
    list.sort((x, y) => x.id - y.id);
  }

  onNewToDO(newTOdo) {
    this.setState((state) => {
      return {
        taskList: [newTOdo, ...state.taskList],
      };
    });
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
    this.setState((state) => {
      const filtedTaskList = state.taskList.filter(
        (task) => task.id !== newItem.id
      );
      return {
        taskList: [newItem, ...filtedTaskList],
      };
    });
  }

  removeTodoItem(itemId) {
    this.setState((state) => {
      return {
        taskList: state.taskList.filter((item) => item.id !== itemId),
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
    this.setState((state) => {
      const filteredList = state.taskList.filter(
        (item) => item.id !== favoriteItem.id
      );
      return {
        taskList: [favoriteItem, ...filteredList],
      };
    });
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
    this.setState((state) => {
      const filteredList = state.taskList.filter(
        (item) => item.id !== editItem.id
      );
      return {
        taskList: [editItem, ...filteredList],
      };
    });
    return editItem;
  }

  handleKeyUp(e, item) {
    const inputText = this.handleEdit(e);
    let editItem = this.toggleEditing(item);
    if (e.key === "Escape") {
      e.target.value = editItem.toDoTask;
    }
    if (e.key === "Enter") {
      e.target.value = inputText;
      e.target.disabled = true;
    }
  }

  handleEdit(e) {
    e.target.focus();
    return e.target.value;
  }

  render() {
    const {
      handleToggle,
      removeTodoItem,
      toggleIsFavorite,
      toggleEditing,
      handleKeyUp,
      handleEdit,
    } = this;

    function listItem(list) {
      if (list.length >= 1) {
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
                value={item.toDoTask}
                onKeyUp={(e) => handleKeyUp(e, item)}
                onChange={(e) => handleEdit(e)}
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
    }

    return (
      <div className="App">
        <UserInput onNewToDO={(newTodo) => this.onNewToDO(newTodo)} />
        <Divider orientation="left">To Do List</Divider>
        {this.state.taskList.map((item) => {
          if (!item.finished) {
            if (item.isFavorite) {
              const toDoFavorites = [];
              toDoFavorites.push(item);
              return <UserForm listItem={listItem(toDoFavorites)} />;
            }
          }
        })}
        {this.state.taskList.map((item) => {
          if (!item.finished) {
            if (!item.isFavorite) {
              const toDoUnFavorites = [];
              toDoUnFavorites.push(item);
              return <UserForm listItem={listItem(toDoUnFavorites)} />;
            }
          }
        })}

        <Divider orientation="left">Done</Divider>
        {this.state.taskList.map((item) => {
          if (item.finished) {
            if (item.isFavorite) {
              const DoneFavorites = [];
              DoneFavorites.push(item);
              return <UserForm listItem={listItem(DoneFavorites)} />;
            }
          }
        })}
        {this.state.taskList.map((item) => {
          if (item.finished) {
            if (!item.isFavorite) {
              const DoneUnFavorites = [];
              DoneUnFavorites.push(item);
              return <UserForm listItem={listItem(DoneUnFavorites)} />;
            }
          }
        })}
      </div>
    );
  }
}

export default App;
