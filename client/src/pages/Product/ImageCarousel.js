import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export default function ImageCarousel({ data }) {
    if (!Array.isArray(data)) {
        // Handle the case where data is not an array, for example, by returning a message or rendering a default component.
        return <p>No images to display.</p>;
    }

    return (     
        <>
            <Carousel showThumbs={false} autoPlay={true} interval={3000} infiniteLoop={true} showArrows={false} showIndicators={false} >            
                {data.map((image, index) => (
                    <div key={index}>            
                            <img  
                                alt=""
                                src={image} 
                                style={{maxHeight: '100%', width: '100%'}}
                            
                            />
                    </div>            
                ))}
            </Carousel>
        </>     
    );
}
