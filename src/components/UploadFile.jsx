import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [folderName, setFolderName] = useState('');
  const [uploadedURLs, setUploadedURLs] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFolderNameChange = (event) => {
    setFolderName(event.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      setErrors(['Please select a file']);
      return;
    }

    const formData = new FormData();
    formData.append('location', folderName);
    formData.append('files', file);

    try {
        console.log("this is the fomr data ",formData);
      const response = await axios.post(
        'https://case.ir4u.info/api/v1/admin/case/media/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTgwMTU3NTcsIlVzZXJuYW1lIjoiYWRtaW4iLCJSb2xlIjpbImFkbWluIiwidXNlciJdfQ.DG4S1QQkEK2ak_JvFG7MG1RArVTkCPONAvJHNZsdCFs',
          },
        }
      );

      setUploadedURLs(response.data.urls);
      setErrors([]);
    } catch (error) {
        console.log(error);
      setErrors([error.message]);
    }
  };
  console.log(uploadedURLs);

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Folder Name"
        value={folderName}
        onChange={handleFolderNameChange}
      />
      <button onClick={handleUpload}>Upload</button>

      {errors.length > 0 && (
        <div>
          <h3>Errors:</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {uploadedURLs.length > 0 && (
        <div>
          <h3>Uploaded URLs:</h3>
          <ul>
            {uploadedURLs.map((url, index) => (
              <li key={index}>{url}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
