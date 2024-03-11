import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const UploadComponent = () => {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [showImage, setShowImage] = useState(false);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', file);

    axios.post('http://localhost:5000/upload', formData)
      .then(response => {
        setUploadMessage(response.data.message);
        setShowImage(true); 
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadMessage && <p>{uploadMessage}</p>}
      <Link to="/display">Go to Display Component</Link>
    </div>
  );
}