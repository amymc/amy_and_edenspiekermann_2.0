import React from 'react';
import Link from 'react-router/Link'

import Tag from './Tag';
import {formatDate, splitString} from '../helpers';
import '.././styles/modules/info-block.css';

class InfoBlock extends React.Component {

  render() {
    const {details} = this.props;

    return (
      <div className="image-item__info-block">
        <h2 className="image-item__title">{details.title}</h2>
        <Link to={{
              pathname: '/',
              query: { author: splitString(details.author) }
            }}
            >
          <p className="image-item__info-row image-item__info-item" >{splitString(details.author)}</p>
        </Link>
        <p className="image-item__info-row">{formatDate(details.date_taken)}</p>
        <p className="image-item__info-row">
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