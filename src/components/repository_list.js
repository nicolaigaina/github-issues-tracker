import React from "react";

const RepositoriesList = (props) => {
    const repositoryItems = props.repositories.map(repo => {
        return (
            <li key={repo.id}>
                {repo.name}
            </li>
        );
    });

    return (
        <ul className="col-md-4 list-group">
          {repositoryItems}
        </ul>
      );
};

export default RepositoriesList;