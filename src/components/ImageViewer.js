import React from 'react';
import update from 'react-addons-update';
import { BrowserRouter, Match, Miss, hashHistory } from 'react-router';
import {splitString} from '../helpers';

//import {BrowserRouter, Router, Route} from 'react-router';
// FetchJsonp adds JSONP support to the Fetch API
import FetchJsonp from 'fetch-jsonp';
import ImageItem from './ImageItem';


class ImageViewer extends React.Component {
  constructor() {
    super();

    // initial state
    this.state = {
      imageItems: {},
      filterItems: {},
      isLoading: true
    }
    this.filterItems = this.filterItems.bind(this);
    this.separateTags = this.separateTags.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
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

  filterItems(e, type, filterItem, filterItemAlias) {
    e.preventDefault();
    e.stopPropagation();

    let filteredList = this.state.imageItems.filter(function (item) {
      if (type === 'author') {
        return item.author_id === filterItem;
      }
      return item.tags.indexOf(filterItem) > -1;
    });

    const url = `/${type}/${filterItem}/`
    console.log('url', url);
     this.context.router.transitionTo(url);
    //should i be doing it like this?
    console.log('setting new state!');
    this.setState({
      imageItems: filteredList,
      filterItems: this.filterItems,
    });

    this.updateTitle(type, filterItem, filterItemAlias);
    console.log('filterItem', filterItem, 'this.context.router', this.context.router);

   // this.context.router.transitionTo(url);
    //this.props.location.query.t = key;
  }

  //prepareData
  separateTags(items) {
    let imageItems = [];
    for (let i = 0; i < items.length; i++) {
      let tagsArray = items[i].tags.split(' ');
      imageItems.push(update(items[i], {
        tags: {$set: tagsArray}
      }));
    }
    console.log('this.filterItems', this.filterItems);
    this.setState({
      imageItems: imageItems,
      filterItems: this.filterItems,
      isLoading: false
    });
    console.log('newData', imageItems);
  }

  updateTitle(type, filterItem, filterItemAlias) {
    let item;

    console.log('this.title', this.title);
    if (filterItemAlias) {
      item = splitString(filterItemAlias);
    } else {
      item = filterItem;
    }
    this.title.innerHTML = 'Filtered on ' + type + ':' + item;
  }



  render() {
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
