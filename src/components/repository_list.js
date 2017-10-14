import React from "react";
import RepositoryListItem from "./repository_list_item";

const RepositoriesList = props => {
  let repositoryItems = null;
  if (props && props.repositories) {
    repositoryItems = props.repositories.map(repo => {
      return (
        <RepositoryListItem
          key={repo.id}
          repository={repo}
          onRepositorySelect={props.onRepositorySelect}
        />
      );
    });
  }

  return (
    <div className="col-md-4 margined">
      {props.repositories && props.repositories.length ? <h3>Repositories:</h3> : null}
      <ul className="list-group">{repositoryItems}</ul>
    </div>
  );
};

export default RepositoriesList;
