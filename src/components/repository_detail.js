import React from "react";

const RepositoryDetail = ({issues}) => {
    if(!issues) {
        return <div>This repository has no issues. </div>;
    }

    const issueItems = issues.map(issue => {
        return (
          <li key={issue.id}  className="list-group-item">
            <span>{issue.title} | <strong>{issue.state}</strong></span>
          </li>
        );
      });

    return (
        <div className="repository-detail col-md-8">
        { issues.length ? <h3>Issues:</h3> : null}
        <ul className="col-md-4 list-group">{issueItems}</ul>
      </div>
    )
}

export default RepositoryDetail;