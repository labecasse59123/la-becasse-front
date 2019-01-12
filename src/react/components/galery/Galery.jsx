import React, { PureComponent } from 'react';
import { Carousel } from 'antd';
import PropTypes from 'prop-types';

import classNames from './galery.module.scss';

export default class Galery extends PureComponent {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      img: PropTypes.string,
      alt: PropTypes.string,
    })),
  };

  static defaultProps = {
    images: [],
  };

  /** Renders Carousel. */
  render() {
    return (
      <Carousel autoplay className={classNames.carousel}>
        {
          this.props.images.map(image => (
            <div key={image.id} className={classNames.imageWrapper}>
              <img
                alt={image.alt}
                src={image.img}
              />
            </div>
          ))
        }
      </Carousel>
    );
  }
}
