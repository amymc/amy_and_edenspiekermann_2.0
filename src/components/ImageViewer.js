import React from 'react';
import update from 'react-addons-update';
// FetchJsonp adds JSONP support to the Fetch API
import FetchJsonp from 'fetch-jsonp';
import { splitString } from '../helpers';
import ImageItem from './ImageItem';


class ImageViewer extends React.Component {
  constructor() {
    super();

    this.state = {
      imageItems: {},
      filterItems: {},
      isLoading: true
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
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.location.query && this.currentQuery !== nextProps.location.query) {
      console.log('hey its not a match');
      this.filterItems(nextProps.location.query);
    } else if (!nextProps.location.query) {
      this.setState({
        imageItems: this.originalList,
        filterItems: this.filterItems
      });
      this.title.innerHTML = '&lsaquo;Insert witty title here&rsaquo;';
    }
    this.currentQuery = nextProps.location.query;
    return true;
  }

  filterItems(queryObject) {
    let type = Object.keys(queryObject)[0];
    let filterItem = Object.values(queryObject)[0];

    let filteredList = this.originalList.filter(function (item) {
      console.log('type', type, type === 'author');
      if (type === 'author') {
        console.log('item.author', item.author);
        return splitString(item.author) === filterItem;
      }
      return item.tags.indexOf(filterItem) > -1;
    });

    console.log('setting new state!', filteredList);
    this.setState({
      imageItems: filteredList,
      filterItems: this.filterItems,
    });

    this.title.innerHTML = 'Filtered on ' + type + ':' + filterItem;
  }

  //prepareData
  separateTags(items) {
    this.originalList = [];
    for (let i = 0; i < items.length; i++) {
      let tagsArray = items[i].tags.split(' ');
      this.originalList.push(update(items[i], {
        tags: {$set: tagsArray}
      }));
    }
    this.setState({
      imageItems: this.originalList,
      filterItems: this.filterItems,
      isLoading: false
    });
  }

  render() {
    console.log('render!!', this.state.imageItems);
    return (
        <div className="image-viewer__inner-wrapper">
          <h1 className="image-viewer__title" ref={(h1) => {this.title = h1}}>
            &lsaquo;Insert witty title here&rsaquo;
          </h1>
          <div id="js-image-items-wrapper">
            {this.state.isLoading ? <span className="loader">Loading</span> : null}
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

ImageViewer.contextTypes = {
  router: React.PropTypes.object
}

export default ImageViewer;
