import React from 'react';

class Image extends React.Component {

  constructor() {
    super();
    this.lazyLoadImages = this.lazyLoadImages.bind(this);
  }

  componentDidMount() {
    this.lazyLoadImages();
    window.addEventListener('scroll', this.lazyLoadImages);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.lazyLoadImages);
  }

  lazyLoadImages() {
    // add 100 - hack to account for the src placeholder gifs 
    // before images are loaded the gifs take up more height than the final images
    // so browser thinks images aren't in view 
    if (this.image.getBoundingClientRect().top < window.innerHeight + 100) {
      let dataSrc = this.image.getAttribute('data-src');
      this.image.setAttribute('src', dataSrc);
      console.log('pn', this.image.parentNode, 'cl', this.image.parentNode.className);
      this.image.parentNode.classList.add("image-item__link--loaded");
    }
  }

  render() {
    const {details} = this.props;

    return (
      <div className="image-item__image-wrapper">
        <a className="image-item__link" href={details.link}>
          <img className="image-item__image" alt={details.title} ref={(img) => {this.image = img}} data-src={details.media.m} src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"/>
        </a>
      </div>
    )
  }
}

export default Image;