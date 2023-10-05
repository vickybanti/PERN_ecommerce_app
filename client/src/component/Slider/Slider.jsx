import React, { useEffect, useState } from 'react'
import "./Slider.scss";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {sliderData} from './slider-data';
import { NavLink } from 'react-router-dom';
import { ShoppingBag } from '@mui/icons-material';

function Slider() {

    const[slide, setSlide]  = useState(0)
    const slideLength = sliderData.length;

    const autoScroll = true;

    let slideInterval;
    let intervalTime = 5000;


    function prevSlide() {
        setSlide(slide === 2 ? slideLength : (prev) => prev-1)
    }

    function nextSlide() {
        setSlide(slide === slideLength ? 0 : (next) => next + 1)
    }

    useEffect(() => {
        setSlide(0)
    },[])

    
    useEffect(() => {
        
        if (autoScroll) {
            function auto () {
                slideInterval = setInterval(nextSlide,intervalTime);
            }
            auto()
        }
        return ()=> clearInterval(slideInterval);
    },[slide, slideInterval, autoScroll])
    
  return (
    <div className='slider'>
    
    
        <ArrowBackIosNewIcon className='arrow prev' onClick={prevSlide} />
        <ArrowForwardIosIcon className='arrow next' onClick={nextSlide}/>
        {sliderData.map((slider, index) => {
            const {image, desc, heading, heading2, desc2} = slider
            return (
                <div className={index === slide ? "slide current":"slide"}>
                    {index ===slide && (
                        <>
                        {console.log(image)}
                            <img src={image} alt="slide" />
                            <h3 className='heading2'>{heading2}</h3>
                            <p className='desc2'>{desc2}</p>
                            <div className='content'>
                                <h2>{heading}</h2>
                                <p style={{fontSize:"12px"}}>{desc}</p>
                                
                                <hr />
                                <NavLink href='#brands' className='--btn --btn-primary'>
                                <ShoppingBag />
                                    Shop Now
                                </NavLink>
                            </div>

                            <div className='content2'>
                            
                            </div>
                        </>
                    )}
                </div>
            )
        })}
    </div>
        
  );
}

export default Slider
