import React from "react";
import "./App.css";
import UserInput from "./components/UserInput.jsx";
import "antd/dist/antd.css";
import Task from "./components/Task";
import { Divider, List } from "antd";
import { Typography } from "antd";

const { Title } = Typography;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
    };
    this.inputElement = null;
    this.toggleTodoItem = this.toggleTodoItem.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.removeTodoItem = this.removeTodoItem.bind(this);
    this.toggleIsFavorite = this.toggleIsFavorite.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.onReset = this.onReset.bind(this);
    this.focusTextInput = () => {
      if (this.inputElement) this.inputElement.focus();
    };
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
  }

  handleKeyUp(e, item) {
    const taskList = this.state.taskList;
    taskList.map((task) => {
      if (task.id === item.id) {
        if (e.key === "Enter") {
          task.toDoTask = this.inputElement.state.value;
          task.isEditing = !task.isEditing;
        }
        if (e.key === "Escape") {
          task.isEditing = !task.isEditing;
        }
      }
    });

    this.setState({
      taskList: taskList,
    });
  }

  onReset() {
    this.setState({
      taskList: [],
    });
  }

  renderTaskView = (
    listtype,
    handleToggle,
    handleKeyUp,
    toggleEditing,
    removeTodoItem,
    toggleIsFavorite,
    focusTextInput
  ) => {
    return (
      <Task
        list={listtype}
        handleToggle={handleToggle}
        handleKeyUp={handleKeyUp}
        toggleEditing={toggleEditing}
        removeTodoItem={removeTodoItem}
        toggleIsFavorite={toggleIsFavorite}
        inputRef={(el) => (this.inputElement = el)}
        focusTextInput={focusTextInput}
      />
    );
  };

  render() {
    this.handleSort(this.state.taskList)
    const {
      handleToggle,
      removeTodoItem,
      toggleIsFavorite,
      toggleEditing,
      handleKeyUp,
      onReset,
      focusTextInput,
    } = this;
    const taskCallbacks = [
      handleToggle,
      handleKeyUp,
      toggleEditing,
      removeTodoItem,
      toggleIsFavorite,
      focusTextInput,
    ];
    return (
      <div className="App">
        <Title>Kelly's to do app</Title>
        <UserInput
          onNewToDO={(newTodo) => this.onNewToDO(newTodo)}
          items={this.state.taskList}
          onReset={onReset}
        />
        <Divider orientation="left">To Do List</Divider>
        <List bordered>
          {this.state.taskList.map((item) => {
            if (!item.finished) {
              if (item.isFavorite) {
                const toDoFavorites = [];
                toDoFavorites.push(item);
                return this.renderTaskView(toDoFavorites, ...taskCallbacks);
              }
            }
          })}

          {this.state.taskList.map((item) => {
            if (!item.finished) {
              if (!item.isFavorite) {
                const toDoUnFavorites = [];
                toDoUnFavorites.push(item);
                return this.renderTaskView(toDoUnFavorites, ...taskCallbacks);
              }
            }
          })}
        </List>

        <Divider orientation="left">Done</Divider>
        <List
          bordered
          footer={"© 2020 Kelly.  Pwoered by ITC. All rights reserved."}
        >
          {this.state.taskList.map((item) => {
            if (item.finished) {
              if (item.isFavorite) {
                const DoneFavorites = [];
                DoneFavorites.push(item);
                return this.renderTaskView(DoneFavorites, ...taskCallbacks);
              }
            }
          })}
          {this.state.taskList.map((item) => {
            if (item.finished) {
              if (!item.isFavorite) {
                const DoneUnFavorites = [];
                DoneUnFavorites.push(item);
                return this.renderTaskView(DoneUnFavorites, ...taskCallbacks);
              }
            }
          })}
        </List>
      </div>
    );
  }
}

export default App;
