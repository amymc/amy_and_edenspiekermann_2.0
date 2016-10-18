import React from 'react';

class Tag extends React.Component {

  render() {
    return (
      <span className="image-item__info-item" onClick={(e) => this.props.filterItems(e, 'tag', this.props.tagName)}>{this.props.tagName}</span>
    )
  }
}

export default Tag;
