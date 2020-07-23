import React, { Component } from "react";
import { Input, Button } from "antd";

export default class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoTask: "",
      id: 0,
      finished: false,
      isFavorite: false,
      isEditing: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onNewToDO(this.state);
    this.setState({
      toDoTask: "",
      id: (this.state.id += 1),
      finished: false,
      isFavorite: false,
      isEditing: false,
    });
  }

  hadleInput(event) {
    this.setState({
      toDoTask: event.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <Input
          type="text"
          name="toDoTask"
          id="toDoTask"
          value={this.state.toDoTask}
          onChange={(event) => this.hadleInput(event)}
          required
          placeholder="What needs to be done?"
          style={{ width: 300 }}
        />
        <button type="submit">Add task</button>
      </form>
    );
  }
}
