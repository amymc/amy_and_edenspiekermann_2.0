import React from 'react';

class Tag extends React.Component {

  componentDidMount() {
   console.log('tags', this.props);
  }

  render() {
    const {tags} = this.props;

    return (
      <span className="image-item__info-item">{tags}</span>
    )
  }
}

export default Tag;
