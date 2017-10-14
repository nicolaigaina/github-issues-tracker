import _ from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import UserSearchBar from "./components/user_search_bar";
import RepositoriesList from "./components/repository_list";
import RepositoryDetail from "./components/repository_detail";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: null,
      issues: [],
      repositories: [],
      errorToDisplay: ""
    };
  }

  fetchRepositories(username) {
    let response = axios.get(`https://api.github.com/users/${username}/repos`);
    response
      .then(({ data }) => {
        this.setState({
          username,
          repositories: data,
          displayMessage:
            data && data.length !== 0
              ? ""
              : "This user has not created any repositories yet."
        });
      })
      .catch(({ response }) => {
        this.setState({
          username,
          repositories: [],
          displayMessage:
            response.status === 404
              ? "No repositories found for this username."
              : "An error occured, please, try another time."
        });
      });
  }

  fetchIssues(repositoryName) {
    const url = `https://api.github.com/repos/${this.state
      .username}/${repositoryName}/issues`;
    let response = axios.get(url);
    response
      .then(({ data }) => {
        this.setState({ issues: data });
      })
      .catch(({ response }) => {
        issues: [];
      });
  }

  render() {
    return (
      <div>
        <UserSearchBar
          onSearchRepositoriesClick={this.fetchRepositories.bind(this)}
          displayMessage={this.state.displayMessage}
        />
        <RepositoriesList
          onRepositorySelect={this.fetchIssues.bind(this)}
          repositories={this.state.repositories}
        />
        <RepositoryDetail issues={this.state.issues} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));

/*
function fetchIssues(){
	let issues = fetch('https://api.github.com/repos/nicolaigaina/github-issues-tracker/issues');
    issues.then(res => res.json()).then(json => console.log(json));
}

function fetchRepositories(){
	let repos = fetch('https://api.github.com/users/nicolaigaina/repos');
    repos.then(res => res.json()).then(json => console.log(json));
}
*/
