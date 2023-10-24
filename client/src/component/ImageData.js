import React, { useState, useEffect } from 'react';

function ImageData({ item }) {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    if (item.images) {
      const newImageDataArray = [];

      item.images.forEach((image) => {
        const byteArray = new Uint8Array(image.data);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Image = reader.result;
          newImageDataArray.push(base64Image);

          // Check if all images have been processed
          if (newImageDataArray.length === item.images.length) {
            setImageData(newImageDataArray);
          }
        };

        reader.readAsDataURL(blob);
      });
    } else {
      setImageData([]);
    }
  }, [item]);

  return <div >
    <img src={imageData && imageData[0]} alt="" style={{width:"100%", height:"100%", position:"inherit"}}/>
  </div>;
}

export default ImageData;
