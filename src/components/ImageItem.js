import React from 'react';
import ImageBlock from './ImageBlock';
import InfoBlock from './InfoBlock';
import '.././styles/modules/image-item.css';

const ImageItem = (props) =>  {
  return (
    <div className="image-item">
      <ImageBlock details={props.details}/>
      <InfoBlock details={props.details} filterItems={props.filterItems}/>
    </div>
  )
}

export default ImageItem;
