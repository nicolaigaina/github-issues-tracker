import React, { Component } from "react";
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";

let SortableItem = SortableElement(({ value }) => {
  debugger;
  return (
    <li key={value.id} className="list-group-item">
      <span>{value.title | <strong>{value.state}</strong>}</span>
    </li>
  );
});

let SortableList = SortableContainer(({ items }) => {
  return (
    <ul className="col-md-4 list-group">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

class RepositoryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.issues
    };
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      items: arrayMove(this.props.issues, oldIndex, newIndex)
    });
  };
  render() {
    return (
      <SortableList items={this.props.issues} onSortEnd={this.onSortEnd} />
    );
  }
}

export default RepositoryDetail;
