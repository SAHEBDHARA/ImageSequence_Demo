import React, { useState } from 'react';
import { useEffect } from 'react';
import io from 'socket.io-client';

const FileUploadComponent = () => {
    const [fileInputs, setFileInputs] = useState([{ id: Date.now(), file: null }]);
    const [updateMessage, setUpdateMessage] = useState('');

    const handleFileChange = (event, id) => {
        const file = event.target.files[0]; // Get the first selected file
        setFileInputs(prevInputs =>
            prevInputs.map(input =>
                input.id === id ? { ...input, file } : input
            )
        );
    };

    const handleAddUploadButton = () => {
        setFileInputs(prevInputs => [...prevInputs, { id: Date.now(), file: null }]);
    };


    const uploadFile = async (file) => {
        const url = 'http://localhost:3000/api/upload'; 
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    fileName: file.name,
                    contentType: file.type,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                const signedUrl = data.signedUrl;
                await uploadToPresignedUrl(file, signedUrl);
                console.log("Signed url generated",signedUrl)
            } else {
                console.error('Failed to obtain pre-signed URL:', response.statusText);
            }
        } catch (error) {
            console.error('Error obtaining pre-signed URL:', error);
        }
    };


    const uploadToPresignedUrl = async (file, signedUrl) => {
        try {
            const response = await fetch(signedUrl, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type,
                },
            });
            if (!response.ok) {
                console.error('Failed to upload file to pre-signed URL:', response.statusText);
            }else{
                console.log('File uploaded successfully');
            }
        } catch (error) {
            console.error('Error uploading file to pre-signed URL:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        fileInputs.forEach(input => {
            const { file } = input;
            if (file && file.name && file.type) {
                uploadFile(file);
            }
        });
    };

    useEffect(() => {
        const socket = io('http://localhost:3001');
        socket.on('update', (data) => {
        console.log('Received update from server:', data);
        setUpdateMessage(data.message);

        });
        return () => {
          socket.disconnect();
        };
      }, []); 
    

    return (
        <div>
            <h2>Dynamic File Upload</h2>
            <form onSubmit={handleSubmit}>
                {fileInputs.map(input => (
                    <div key={input.id}>
                        <input type="file" multiple onChange={(event) => handleFileChange(event, input.id)} />
                    </div>
                ))}
                <button type="button" onClick={handleAddUploadButton}>Add Upload Button</button>
                <button type="submit">Upload All</button>
                <p>Update from server: {updateMessage}</p>
            </form>
        </div>  
    );
};

export default FileUploadComponent;
