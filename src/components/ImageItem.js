import React from 'react';
import Image from './Image';
import InfoBlock from './InfoBlock';
import '.././styles/modules/image-item.css';

const ImageItem = (props) =>  {
  return (
    <div className="image-item">
      <Image details={props.details}/>
      <InfoBlock details={props.details} filterItems={props.filterItems}/>
    </div>
  )
}

export default ImageItem;
