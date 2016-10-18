import React from 'react';
import update from 'react-addons-update';
//import { BrowserRouter, Match, Miss, hashHistory } from 'react-router';
import {splitString} from '../helpers';
//import history from 'history';

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

    // console.log('history', history);
    // history.listen((location, action) => {
    //   console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
    //   console.log(`The last navigation action was ${action}`)
    // });
  }

  componentWillReceiveProps(nextProps){
    //let currentUrl;
    //
    console.log('should!1', nextProps.location.search, 'current', this.currentQuery, nextProps);
    if (nextProps.location.query && this.currentQuery !== nextProps.location.query) {
      console.log('hey its not a match');
      this.filterItems(nextProps.location.query);

    } 
    this.currentQuery = nextProps.location.query;
    console.log('this.currentUrl', this.currentQuery);
    //console.log('should update', nextProps, this.state);
    return true;
}

 // filterItems(e, type, filterItem, filterItemAlias) {
    filterItems(queryObject) {
     // console.log('filtering', queryObject, Object.keys(queryObject), Object.values(queryObject));


      let type = Object.keys(queryObject)[0];
      let filterItem = Object.values(queryObject)[0];
    // e.preventDefault();
    // e.stopPropagation();


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

    this.updateTitle(type, filterItem);
    // console.log('filterItem', filterItem, 'this.context.router', this.context.router);

   // this.context.router.transitionTo(url);
    //this.props.location.query.t = key;
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
        console.log('this.originalList', this.originalList);

  }

  updateTitle(type, filterItem, filterItemAlias) {
    let item;

    console.log('this.title', this.title);
    // if (filterItemAlias) {
    //   item = splitString(filterItemAlias);
    // } else {
      item = filterItem;
    //}
    this.title.innerHTML = 'Filtered on ' + type + ':' + item;
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
