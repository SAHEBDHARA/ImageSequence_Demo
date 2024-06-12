import React, { useState } from "react";

const Trash = () => {
  const [trashCases, setTrashCases] = useState([]);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);


  const fetchTrashCases = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/admin/case/all/trash",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTgwMTU3NTcsIlVzZXJuYW1lIjoiYWRtaW4iLCJSb2xlIjpbImFkbWluIiwidXNlciJdfQ.DG4S1QQkEK2ak_JvFG7MG1RArVTkCPONAvJHNZsdCFs",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch trash cases");
      }

      const data = await response.json();
      console.log(data);
      setTrashCases(data.data);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  const handleClick = () => {
    fetchTrashCases();
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await fetch("https://case.ir4u.info/api/v1/admin/case/media/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTgwMTU3NTcsIlVzZXJuYW1lIjoiYWRtaW4iLCJSb2xlIjpbImFkbWluIiwidXNlciJdfQ.DG4S1QQkEK2ak_JvFG7MG1RArVTkCPONAvJHNZsdCFs",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }
      console.log("this is the response ",response);
      // Handle successful upload
      // Optionally, fetch updated trash cases after successful upload
    } catch (error) {
      setError(error.message);
      console.log("this is the error ",error);
    }
  };
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Trash;
