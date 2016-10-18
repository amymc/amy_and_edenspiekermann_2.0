import React from 'react';

class Tag extends React.Component {

  // componentDidMount() {
  //  console.log('tag.js', this.props);
  // }

  render() {
    return (
      <span className="image-item__info-item" onClick={(e) => this.props.filterItems(e, 'tag', this.props.tagName)}>{this.props.tagName}</span>
    )
  }
}

export default Tag;
