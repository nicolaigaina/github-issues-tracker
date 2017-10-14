import React from "react";
import RepositoryListItem from "./repository_list_item";

const RepositoriesList = props => {
  const repositoryItems = props.repositories.map(repo => {
    return (
      <RepositoryListItem key={repo.id} repository={repo} onRepositorySelect={props.onRepositorySelect}>
       
      </RepositoryListItem>
    );
  });

  return (
    <div className="col-md-4 margined">
      { props.repositories.length ? <h3>Repositories:</h3> : null}
      <ul className="list-group">
        {repositoryItems}
      </ul>
    </div>
  );
};

export default RepositoriesList;