
import React, { useState, useEffect } from 'react';

function ImageData({ item }) {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
      if (item.images) {
          const newImageDataArray = [];

          item.images.forEach((image) => {
              const byteArray = new Uint8Array(image.data);
              const blob = new Blob([byteArray], { type: 'image/jpeg' });

              const imageUrl = URL.createObjectURL(blob);
              newImageDataArray.push(imageUrl);
          });

          // Check if all images have been processed
          if (newImageDataArray.length === item.images.length) {
              setImageData(newImageDataArray);


          } else {
              setImageData([]);
          }
      }
  }, [item]);

  return <div >
    <img src={imageData && imageData[0]} alt="" style={{width:"100%", height:"100%", position:"inherit"}}/>
  </div>;
}

export default ImageData;
