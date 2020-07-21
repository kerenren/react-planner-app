import React from "react";
import logo from "./logo.svg";
import "./App.css";
import UserInput from "./components/UserInput.jsx";

class App extends React.Component {
  state = {
    toDos: [],
  };

  handleOnNewTodo(newTOdo){
    this.setState((state)=>{
      return {
        toDos: [newTOdo, ...state.toDos]
      }
    })
  }

  render() {
    return (
      <div className="App">
        <UserInput onNewToDO={(newTodo) => this.handleOnNewTodo(newTodo)} />
      </div>
    );
  }
}

export default App;
