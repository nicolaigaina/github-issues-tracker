import React, { Component } from "react";

class UserSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
  }

  render(){
    return(
      <div className="search-bar">
        <p>Enter Username to find Repositories:</p>
        <input onChange={event => this.setState({username: event.target.value})} value={this.state.username}  />
        <button onClick={event => this.handleButtonClick(this.state.username)}>Search</button>
      </div>
    )
  }

  handleButtonClick(username) {
    debugger;
    this.props.onSearchRepositoriesClick(username);
  }
}

export default UserSearchBar;
