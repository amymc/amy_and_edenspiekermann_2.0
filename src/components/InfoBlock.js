import React from 'react';
import update from 'react-addons-update';
import Tag from './Tag';
import {formatDate, splitString} from '../helpers';

class InfoBlock extends React.Component {
  constructor() {
    super();
    this.separateTags = this.separateTags.bind(this);
  }

  componentDidMount() {
    //console.log('props', this.props);
 //   this.separateTags();
  }

  // filterItems(e) {
  //   console.log('filtering', this.author, 'test', this.props.details);
  //   e.preventDefault();

  //   let dataFilterItem = this.author.getAttribute('data-filter-item');
  //   // let filteredData = this.props.details.filter(function (item) {
  //   //  // if (type === 'author') {
  //   //     return item.author_id === dataFilterItem;
  //   //  // }
  //   //   //return item.tags.indexOf(filterItem) > -1;
  //   // });

  //   console.log('wtf', dataFilterItem === this.props.details.authorId);
  // }

    // Ctrl.prototype.filter = function filter(type, e) {
  //   e.preventDefault();
  //   var filterItem = $(e.currentTarget).attr("data-filter-item");
  //   var authorName = $(e.currentTarget).attr("data-author-name");
  //   var itemTitle = authorName ? authorName : filterItem;

  //   var filteredData = this.data.filter(function (item) {
  //     if (type === 'author') {
  //       return item.author_id === filterItem;
  //     }
  //     return item.tags.indexOf(filterItem) > -1;
  //   });

  //   this.renderItems(filteredData);
  //   this.updateUI(type, itemTitle);
  // };


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
    //const {filterItems} = this.props;

    return (
      <div className="image-item__info-wrapper">
        <h2 className="image-item__title">{details.title}</h2>
        <p className="image-item__info-block image-item__info-item" ref={(p) => {this.author = p}} data-filter-item={details.author_id} data-author-name={splitString(details.author)} onClick={() => this.props.filterItems(details.author_id)}>{splitString(details.author)}</p>
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