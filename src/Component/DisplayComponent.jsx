import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const DisplayComponent = () => {
  const [lastImage, setLastImage] = useState(null);

  useEffect(() => {
    // Fetch last uploaded image from backend endpoint
    axios.get('http://localhost:5000/last-image')
      .then(response => {
        setLastImage(response.data);
      })
      .catch(error => {
        console.error('Error fetching last image:', error);
      });
  }, []);

  return (
    <div>
      <h1>Last Uploaded Image</h1>
      {lastImage && (
        <div>
          <img src={`http://localhost:5000/${lastImage.path}`} alt="Last Uploaded" />
        </div>
      )}
    </div>
  );
};
