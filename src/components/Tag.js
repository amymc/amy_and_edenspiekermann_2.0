import React from 'react';

class Tag extends React.Component {

  // componentDidMount() {
  //  console.log('tag.js', this.props);
  // }

  render() {
    return (
      <span className="image-item__info-item">{this.props.tagName}</span>
    )
  }
}

export default Tag;
