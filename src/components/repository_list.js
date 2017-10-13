import React from "react";

const RepositoriesList = props => {
  const repositoryItems = props.repositories.map(repo => {
    return (
      <li key={repo.id} onClick={() => props.onRepositorySelect(repo.name)} className="list-group-item">
        {repo.name}
      </li>
    );
  });

  return (
    <div className="col-md-4">
      { props.repositories.length ? <h3>Repositories:</h3> : null}
      <ul className="list-group">{repositoryItems}</ul>
    </div>
  );
};

export default RepositoriesList;
