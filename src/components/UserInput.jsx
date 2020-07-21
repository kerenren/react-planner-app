import React, { Component } from "react";

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
        toDoTask: ""
    })
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <div>
          <label htmlFor="toDoTask">Add new to do list</label>
          <input
            type="text"
            name="toDoTask"
            id="toDoTask"
            value={this.state.toDoTask}
            onChange={(event) =>
              this.setState({ toDoTask: event.target.value })
            }
            required
          />
          <button type="submit">+</button>
        </div>
      </form>
    );
  }
}
