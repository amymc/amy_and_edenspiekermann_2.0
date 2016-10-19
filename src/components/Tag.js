import React from 'react';
import Link from 'react-router/Link';
//import '.././styles/modules/image-item.css';

const Tag = (props) => {
  return (
    <Link to={{
          pathname: '/',
          query: { tag: props.tagName }
        }}>
      <span className="image-item__info-item">{props.tagName}</span>
    </Link>
    
  )
}

export default Tag;
