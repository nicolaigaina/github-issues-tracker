import React, { Component } from "react";

class UserSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
  }

  displayErrorMessage() {
    return this.props.displayMessage ? (
      <label className="alert alert-danger margined" id="basic-addon3">
        {this.props.displayMessage}
      </label>
    ) : null;
  }

  render() {
    return (
      <div className="col-sm-12 col-md-6 col-lg-12 margined no-padding">
        <h3 className="margined" htmlFor="basic-url">Enter Username to find Repositories:</h3>
        <div className="form-inline">
          <input
            className="form-control margined"
            id="basic-url"
            placeholder="Username"
            onChange={event => this.setState({ username: event.target.value })}
            value={this.state.username} />
          <button
            className="btn btn-primary margined"
            onClick={event => this.handleButtonClick(this.state.username)}>
            Search
          </button>
          {this.displayErrorMessage()}
        </div>
      </div>
    );
  }

  handleButtonClick(username) {
    this.props.onSearchRepositoriesClick(username);
  }
}

export default UserSearchBar;
