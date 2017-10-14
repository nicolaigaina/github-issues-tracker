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

    this.state = Object.assign({}, props.globalCache);
  }

  fetchRepositories(username) {
    axios
      .get(`https://api.github.com/users/${username}/repos`)
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

  fetchIssues(repositoryName, username) {
    const url = `https://api.github.com/repos/${username}/${repositoryName}/issues`;
    axios
      .get(url)
      .then(({ data }) => {
        let globalCache = getGlobalCache();
        
        if(data.length !== globalCache.issues.length) {
          this.setState({ issues: data });
        } else{
          this.setState({ issues: globalCache.issues });
        }
      })
      .catch(({ response }) => this.setState({ issues: [] }));
  }

  handleSelect(selectedRepository) {
    this.setState({ selectedRepository: selectedRepository.name });
    this.fetchIssues(selectedRepository.name, this.state.username);
  }

  handleIssuesSort(sortedIssues) {
    this.setState({ issues: sortedIssues });
    let globalCache = getGlobalCache();
    globalCache.issues = sortedIssues;
    localStorage.setItem("globalCache", JSON.stringify(globalCache));
  }

  render() {
    return (
      <div>
        <UserSearchBar
          onSearchRepositoriesClick={this.fetchRepositories.bind(this)}
          displayMessage={this.state.displayMessage}
        />
        <RepositoriesList
          onRepositorySelect={this.handleSelect.bind(this)}
          repositories={this.state.repositories}
        />
        <RepositoryDetail 
          selectedRepository={this.state.selectedRepository}
          onIssuesSort={this.handleIssuesSort.bind(this)}
          issues={this.state.issues}
        />
      </div>
    );
  }
}

function getGlobalCache() {
  let globalCache = JSON.parse(localStorage.getItem("globalCache")) || {
    username: null,
    issues: [],
    repositories: [],
    errorToDisplay: "",
    selectedRepository: null
  };

  return globalCache;
}

let globalCache = getGlobalCache();

ReactDOM.render(
  <App globalCache={globalCache} />,
  document.querySelector(".container")
);

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
