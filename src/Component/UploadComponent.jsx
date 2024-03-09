import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using axios for API calls

export const UploadComponent = () => {
  const [mediaType, setMediaType] = useState('video');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleUpload = async () => {
    setUploadStatus('Uploading...');
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('mediaType', mediaType);

      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStatus('Upload successful!');
      setSelectedFile(null); // Clear selected file input
      setFileName(''); // Clear filename input

      // Optionally, handle response data from server here
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus(null);
      setUploadError('Upload failed. Please try again.');
    }
  };

  return (
    <div>
      <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
        <option value="video">Video</option>
        <option value="image">Image</option>
      </select>
      
      <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />

      <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} />

      <button onClick={handleUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
      {uploadError && <p className="error">{uploadError}</p>}
    </div>
  );
};
