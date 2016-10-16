import React from 'react';
import ImageItem from './ImageItem';
import FetchJsonp from 'fetch-jsonp';

class ImageViewer extends React.Component {
  constructor() {
    super();

    // initial state
    this.state = {
      imageItems: {}
    }
  }

  componentDidMount() {
    FetchJsonp('http://api.flickr.com/services/feeds/photos_public.gne?tags=edenspiekermann&tagmode=all&format=json&jsoncallback=?', {
      jsonpCallback: 'jsoncallback'
    })
     .then((response) => {
      return response.json();
    }).then((json) => {
      this.setState({
        imageItems: json.items
      });
      console.log('imageItems', this.state.imageItems);
    });
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