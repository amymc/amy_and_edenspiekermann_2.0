import React from 'react';
import update from 'react-addons-update';
import ImageItem from './ImageItem';
import FetchJsonp from 'fetch-jsonp';

class ImageViewer extends React.Component {
  constructor() {
    super();

    // initial state
    this.state = {
      imageItems: {}
    }
    this.separateTags = this.separateTags.bind(this);

  }

  componentDidMount() {
    FetchJsonp('http://api.flickr.com/services/feeds/photos_public.gne?tags=edenspiekermann&tagmode=all&format=json&jsoncallback=?', {
      jsonpCallback: 'jsoncallback'
    })
     .then((response) => {
      return response.json();
    }).then((json) => {
      // this.setState({
      //   imageItems: json.items
      // });
      this.separateTags(json.items);
      console.log('imageItems', this.state.imageItems);
    });
  }

  //prepareData
  separateTags(items) {
  //  console.log('items', items, items.tags);
   // let imageItems = items;
    // let tagsArray = items.tags.split(' ');
    //let tagsArray;
   // console.log('passed value', imageItems);
    let imageItems = []; // = items.tags.split(' ');
    for (let i = 0; i < items.length; i++) {
      console.log('items[i]', items[i], items[i].tags);
      let tagsArray = items[i].tags.split(' ');
      imageItems.push(update(items[i], {
        tags: {$set: tagsArray}
      }));
    }
    //console.log('tagsArray', tagsArray);
    this.setState({
      imageItems: imageItems
    });
    // this.props.details.splitTags = tagsArray;
    console.log('newData', imageItems);
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
          {Object
            .keys(this.state.imageItems)
            .map(key => <ImageItem key={key} details={this.state.imageItems[key]}/>)
          }
        </div>
      </div>
    )
  }
}

export default ImageViewer;

//render(<ImageViewer/>, document.getElementById('image-viewer'));