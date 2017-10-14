import React, { Component } from "react";
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";

let SortableItem = SortableElement(({ value }) => {
  return (
    <li className="list-group-item bottom-margin">
      <span>{value.title}</span> | <strong>{value.state}</strong>
    </li>
  );
});

let SortableList = SortableContainer(({ items }) => {
  return (
    <ul className="list-group">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

class RepositoryDetail extends Component {
  onSortEnd = ({ oldIndex, newIndex }) => {
    let sortedItems = arrayMove(this.props.issues, oldIndex, newIndex);
    const { onIssuesSort } = this.props;

    onIssuesSort(sortedItems);
  };

  render() {
    return (
      <div className="col-md-4 margined">
        {this.props.issues.length ? <h3>Issues:</h3> : null}
        <SortableList items={this.props.issues} onSortEnd={this.onSortEnd} />
      </div>
    );
  }
}

export default RepositoryDetail;
