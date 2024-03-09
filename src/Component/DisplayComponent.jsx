// src/components/DisplayComponent.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export const DisplayComponent = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fileType = queryParams.get('fileType');
  const fileName = queryParams.get('fileName');
  const [fileContent, setFileContent] = useState(null);

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getFile/${fileName}`);
        setFileContent(response.data);
      } catch (error) {
        console.error('Error fetching file content:', error);
      }
    };

    if (fileName) {
      fetchFileContent();
    }
  }, [fileName]);

  return (
    <div>
      <h2>Display Component</h2>
      {fileType && fileName && (
        <div>
          <p>File Type: {fileType}</p>
          <p>File Name: {fileName}</p>
          {fileType === 'image' && fileContent && (
            <img src={`data:image/png;base64,${fileContent}`} alt="Uploaded" />
          )}
          {fileType === 'video' && fileContent && (
            <video controls width="400">
              <source src={`data:video/mp4;base64,${fileContent}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}
      {!fileType || !fileName && (
        <p>No file information found.</p>
      )}
    </div>
  );
};
