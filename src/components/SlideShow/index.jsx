/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PT from 'prop-types';
import Slider from 'react-slick';

import styles from './styles.scss';

const SlideShow = ({ children }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let slidesToShow;
  let slidesToScroll;
  let variableWidth = true;
  let centerMode = false;

  if (windowSize.width > 2540) {
    slidesToShow = 4;
    slidesToScroll = 4;
  } else if (windowSize.width > 1960) {
    slidesToShow = 3;
    slidesToScroll = 3;
  } else if (windowSize.width > 1380) {
    slidesToShow = 2;
    slidesToScroll = 2;
  } else if (windowSize.width > 1024) {
    slidesToShow = 1;
    slidesToScroll = 1;
  } else {
    slidesToShow = 1;
    slidesToScroll = 1;
    variableWidth = false;
    centerMode = true;
  }

  const settings = {
    dots: true,
    autoplay: false,
    infinite: false,
    arrows: false,
    swipeToSlide: true,
    centerPadding: '0',
    slidesToShow,
    slidesToScroll,
    centerMode,
    variableWidth,
    dotsClass: `slick-dots ${styles['slideShow-dots']}`,
  };

  return (
    <div styleName="slide-show">
      <Slider {...settings}>
        {children}
      </Slider>
    </div>
  );
};

SlideShow.defaultProps = {
  children: null,
};

SlideShow.propTypes = {
  children: PT.node,
};

export default SlideShow;
