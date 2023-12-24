import React, { useEffect, useState } from 'react'
import {adsData} from './adsData'
import './Ads.scss'

function Ads() {
    const[slide, setSlide]  = useState(0)
    const slideLength = adsData.length;

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
    <div className='adslider'>
    
    
        
        {adsData.map((slider, index) => {
            const {desc} = slider
            return (
                <div className={index === slide ? "slide current":"adslide"}>
                    {index ===slide && (
                        <>
                        
                            <p style={{fontSize:"20px",color:"black"}}>{desc}</p>
                  
                        </>
                        
                    )}
                    
                </div>
            )
        })}
    </div>
  )
}

export default Ads
