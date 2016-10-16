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
    // console.log('lazy loading', this.image.getBoundingClientRect().top, 'scroll', window.scrollY);
    // console.log('window', window.innerHeight);
    if (this.image.getBoundingClientRect().top < window.innerHeight) {
      console.log('img loaded', this.image, 'this.image.getBoundingClientRect().top', this.image.getBoundingClientRect().top);
      let dataSrc = this.image.getAttribute('data-src')
      this.image.setAttribute('src', dataSrc);
      // $(image).parent().addClass('image-item__link--loaded');
    }
  }

  render() {
    const {details} = this.props;
   // const {details, index} = this.props;
   // then available as this.props.details and this.props.index

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