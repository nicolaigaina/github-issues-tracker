import React, { Component } from "react";
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";

let SortableItem = SortableElement(({ value }) => {
  return (
    <li key={value.id} className="list-group-item">
      <span>{value.title}</span> | <strong>{value.state}</strong>
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

  getDataFromLocalStorage(){
    let issues = JSON.parse(localStorage.getItem('issues'));
    if(issues) {
      this.setState({ 
        items: issues 
       });
    }
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex)
    });

    // setter
    localStorage.setItem('issues', JSON.stringify(this.state));
  };
  render() {
    return (
      <div className="repository-detail col-md-8">
        { this.props.issues.length ? <h3>Issues:</h3> : null }
        <SortableList items={this.props.issues} onSortEnd={this.onSortEnd} />
      </div>
      
    );
  }
}

export default RepositoryDetail;
