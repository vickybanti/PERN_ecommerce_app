import React from "react";
import { motion } from "framer-motion"

function HomeBrand() {
    return (

        <motion.div
  whileHover={{ scale: 1.2 }}
  whileTap={{ scale: 1.1 }}
  drag="x"
  dragConstraints={{ left: -100, right: 100 }}
/>

    
    <div className="container-brand" href='#brand'>

    <img
            className="img-fluid col-lg-2 col-md-4 col-6"
            src="img/brand/1.png"
            alt=""
          />,
          <img
            className="img-fluid col-lg-2 col-md-4 col-6"
            src="img/brand/2.png"
            alt=""
          />,
          <img
            className="img-fluid col-lg-2 col-md-4 col-6"
            src="img/brand/3.png"
            alt=""
          />,
          <img
          className="img-fluid col-lg-2 col-md-4 col-6"
          src="img/brand/3.png"
          alt=""
        />,
        <img
        className="img-fluid col-lg-2 col-md-4 col-6"
        src="img/brand/3.png"
        alt=""
      />,
          <img
            className="img-fluid col-lg-2 col-md-4 col-6"
            src="img/brand/4.png"
            alt=""
          />,
          <img
            className="img-fluid col-lg-2 col-md-4 col-6"
            src="img/brand/5.png"
            alt=""
          />,
          <img
            className="img-fluid col-lg-2 col-md-4 col-6"
            src="img/brand/6.png"
            alt=""
          />

          </div>
  );
  
}

export default HomeBrand;
