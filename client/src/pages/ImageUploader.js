import React, { useState } from 'react';

function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    // Create a new FormData instance
    const formData = new FormData();
    formData.append('image', file);

    // Send the FormData object to the backend using fetch
    fetch('http://localhost:5000/products/image', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response from the backend
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='pload' style={{padding:"200px"}}>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {selectedImage && <img src={selectedImage} alt="Selected" />}
    </div>
  );
}

export default ImageUploader;
