import React from 'react';
import update from 'react-addons-update';
import Tag from './Tag';
import {formatDate, splitString} from '../helpers';

class InfoBlock extends React.Component {
  constructor() {
    super();
    this.filterItems = this.filterItems.bind(this);
    this.separateTags = this.separateTags.bind(this);
  }

  componentDidMount() {
    console.log('tags', this.props.details.tags);
 //   this.separateTags();
  }

  filterItems() {
    console.log('filtering', this);
  }

  separateTags() {
    let tagsArray = this.props.details.tags.split(' ');
    this.updatedItems = update(this.props.details, {
      tags: {$set: tagsArray}
    });
    // this.props.details.splitTags = tagsArray;
    console.log('oldData', this.updatedItems);
    // console.log('newdata', newData);
    // console.log('details.tags', this.props.details.tags);
    // // for (var i=0; i < data.length; i++) {
    // //   var tagsArray = data[i].tags.split(' ');
    // //   data[i].tags = tagsArray;
    // // }
    // //this.data = data;
    // //this.renderItems(data);
    // console.log('test', (this.props.details.tags).map(key => this.props.details.tags[key]));
  }

  render() {
    const {details} = this.props;

    return (
      <div className="image-item__info-wrapper">
        <h2 className="image-item__title">{details.title}</h2>
        <p className="image-item__info-block image-item__info-item js-author" onClick={this.filterItems}>{splitString(details.author)}</p>
        <p className="image-item__info-block">{formatDate(details.date_taken)}</p>
        <p className="image-item__info-block">
          Tags
           {Object
            .keys(details.tags)
            .map(key => <Tag key={key} tagName={details.tags[key]}/>)
          }
        </p>
      </div>
    )
  }
}

export default InfoBlock;