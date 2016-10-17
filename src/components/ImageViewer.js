import React from 'react';
import update from 'react-addons-update';
import ImageItem from './ImageItem';
import FetchJsonp from 'fetch-jsonp';

class ImageViewer extends React.Component {
  constructor() {
    super();

    // initial state
    this.state = {
      imageItems: {},
      filterItems: {}
    }
    this.filterItems = this.filterItems.bind(this);
    this.separateTags = this.separateTags.bind(this);
  }

  componentDidMount() {
    FetchJsonp('http://api.flickr.com/services/feeds/photos_public.gne?tags=edenspiekermann&tagmode=all&format=json&jsoncallback=?', {
      jsonpCallback: 'jsoncallback'
    })
     .then((response) => {
      return response.json();
    }).then((json) => {
      this.separateTags(json.items);
    });
    console.log('i am filter items', this.filterItems);
  }

  filterItems(filterItem) {
    console.log('filtering!!', filterItem);

    var filteredList = this.state.imageItems.filter(function (item) {
     // if (type === 'author') {
        return item.author_id === filterItem;
     // }
      //return item.tags.indexOf(filterItem) > -1;
    });
    console.log('filteredList', filteredList);

    //should i be doing it like this?
    this.setState({
      imageItems: filteredList,
      filterItems: this.filterItems
    });
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

  //prepareData
  separateTags(items) {
    let imageItems = [];
    for (let i = 0; i < items.length; i++) {
      let tagsArray = items[i].tags.split(' ');
      imageItems.push(update(items[i], {
        tags: {$set: tagsArray}
      }));
    }
    this.setState({
      imageItems: imageItems,
      filterItems: this.filterItems
    });
    console.log('newData', imageItems);
  }


  render() {
    return (
      <div className="image-viewer__inner-wrapper">
        <button id="js-image-viewer-btn" className="image-viewer__btn image-viewer__btn--hidden">
          &#x2190 Back
        </button>
        <h1 id="js-image-viewer-title" className="image-viewer__title">
          &lsaquo;Insert witty title here&rsaquo;
        </h1>
        <div id="js-image-items-wrapper">
          <span className="loader">Loading</span>
          TEST {this.filterItems}
          {Object
            .keys(this.state.imageItems)
            .map(key => <ImageItem key={key} details={this.state.imageItems[key]} filterItems={this.filterItems.bind(this)}/>)
          }
        </div>
      </div>
    )
  }
}

export default ImageViewer;
