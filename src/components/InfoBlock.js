import React from 'react';
import {formatDate, splitString} from '../helpers';

class InfoBlock extends React.Component {
  constructor() {
    super();
    this.filterItems = this.filterItems.bind(this);
  }

  filterItems() {
    console.log('filtering', this);
  }

  render() {
    const {details} = this.props;

    return (
      <div className="image-item__info-wrapper">
        <h2 className="image-item__title">{details.title}</h2>
        <p className="image-item__info-block image-item__info-item js-author" onClick={this.filterItems}>{splitString(details.author)}</p>
        <p className="image-item__info-block">{formatDate(details.date_taken)}</p>
        <p className="image-item__info-block">
         
        </p>
      </div>
    )
  }
}

export default InfoBlock;