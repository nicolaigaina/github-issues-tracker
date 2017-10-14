import React from 'react';

const RepositoryListItem = ({repository, onRepositorySelect}) => {

  return (
    <li onClick={() => onRepositorySelect(repository)} className="list-group-item">
      {repository.name}
    </li>
  );
};

export default RepositoryListItem;