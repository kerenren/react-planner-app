import React, { Component } from "react";
import { Input, Button } from "antd";

export default class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoTask: "",
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onNewToDO(this.state);
    this.setState({
      toDoTask: "",
    });
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        {/* <label htmlFor="toDoTask">Add new to do list</label> */}
        <Input
          type="text"
          name="toDoTask"
          id="toDoTask"
          value={this.state.toDoTask}
          onChange={(event) => this.setState({ toDoTask: event.target.value })}
          required
          placeholder="What needs to be done?"
          style={{ width: 300 }}
        />
        <button type="submit">Add task</button>
      </form>
    );
  }
}
