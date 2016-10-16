import React from 'react';
import Image from './Image';
import InfoBlock from './InfoBlock';

//CHANGE TO CONST??

class ImageItem extends React.Component {
  render() {
    return (
      <div className="image-item">
        <Image details={this.props.details}/>
        <InfoBlock details={this.props.details}/>
      </div>
    )
  }
}

export default ImageItem;
