import React from 'react';

const Tag = (props) => {
  return (
    <span className="image-item__info-item" onClick={(e) => props.filterItems(e, 'tag', props.tagName)}>{props.tagName}</span>
  )
}

export default Tag;
