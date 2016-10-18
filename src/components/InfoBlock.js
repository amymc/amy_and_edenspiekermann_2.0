import React from 'react';
import update from 'react-addons-update';
import Tag from './Tag';
import {formatDate, splitString} from '../helpers';

class InfoBlock extends React.Component {

  render() {
    const {details} = this.props;

    return (
      <div className="image-item__info-wrapper">
        <h2 className="image-item__title">{details.title}</h2>
        <p className="image-item__info-block image-item__info-item" onClick={(e) => this.props.filterItems(e, 'author', details.author_id, details.author)}>{splitString(details.author)}</p>
        <p className="image-item__info-block">{formatDate(details.date_taken)}</p>
        <p className="image-item__info-block">
          Tags
           {Object
            .keys(details.tags)
            .map(key => <Tag key={key} tagName={details.tags[key]} filterItems={this.props.filterItems}/>)
          }
        </p>
      </div>
    )
  }
}

export default InfoBlock;