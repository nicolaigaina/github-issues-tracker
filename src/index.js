import _ from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";

import UserSearchBar from "./components/user_search_bar";
import RepositoriesList from "./components/repository_list";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      issues: [],
      repositories: [],
      selectedRepository: null
    };
  }

   fetchRepositories(username) {
    let response = fetch(`https://api.github.com/users/${username}/repos`);
    response.then(res => res.json()).then((repositories) => {
      this.setState({
        repositories: repositories
      });
    });
  }

  render() {
    return (
      <div>
        <UserSearchBar onSearchRepositoriesClick={this.fetchRepositories.bind(this)} />
        <RepositoriesList repositories={this.state.repositories} />
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
