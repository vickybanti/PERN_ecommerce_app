import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductImageSlider = ({ images }) => {
    console.log(images)
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {images && images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Product Image ${index + 1}`} />
        </div>
      ))}
    </Slider>
  );
};

export default ProductImageSlider;
