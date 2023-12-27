import React from 'react'
import Slider from '../../component/Slider/Slider'
import Featuredroducts from '../../component/FeaturedProducts/Featuredroducts'
import Categories from '../../component/Categories/Categories'
import './Home.scss'
import TrendingProducts from '../../component/FeaturedProducts/TrendingProduct'
import HomeBrand from './HomeBrand'
import Subscribe from './Subscribe'
import Discount from '../../component/FeaturedProducts/Discount'
import Banner from '../../component/Categories/Banner'
import { Box, Fab, Fade, useScrollTrigger } from "@mui/material/";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Brands from '../../component/Categories/Brands'

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

function Homepage() {


  
  return (
    <><div id='back-to-top-anchor'></div>
    <div className='home'>

      <Slider />
      <HomeBrand />
      <Categories />
      <Featuredroducts />
      <Brands />
      <TrendingProducts />





      <Subscribe />



      <ScrollTop>
        <Fab size="large" aria-label="scroll back to top">
          <KeyboardArrowUpIcon sx={{ fontSize: 40 }} />
        </Fab>
      </ScrollTop>


    </div></>
  )
}

export default Homepage
