import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { UploadComponent } from './UploadComponent';

export const  DisplayComponent = () => {
  const [images, setImages] = useState([]);
  const [displayImage, setDisplayImage] = useState(null);

  useEffect(() => {
    // Fetch images from backend API
    axios.get('http://localhost:5000/images')
      .then(response => {
        setImages(response.data);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }, []);

  const handleDisplayImage = (image) => {
    setDisplayImage(image);
  };

  return (
    <div>
      <h2>Image Gallery</h2>
      <div className="image-grid">
        {images.map(image => (
          <div key={image.id} className="image-item">
            <img src={image.path} alt={image.filename} />
            <p>{image.filename}</p>
            <button onClick={() => handleDisplayImage(image)}>Display</button>
          </div>
        ))}
      </div>
      {displayImage && (
        <div>
          <h3>Displayed Image</h3>
          <img src={displayImage.path} alt={displayImage.filename} />
          <p>{displayImage.filename}</p>
        </div>
      )}
    </div>
  );
}


