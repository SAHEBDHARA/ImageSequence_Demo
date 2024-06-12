import React, { useState } from 'react';
import Image from './assets/Image.jpg';
import BodyDiagram from './components/Bodydiagram';
import HeroAnimation from './components/imageSequence';
import VideoPlayer from './components/Videoplayer';
import Trash from './components/Trash';
import FileUpload from './components/UploadFile';

const App = () => {
  const [circlePosition, setCirclePosition] = useState({ x: null, y: null });

  const handleImageClick = (evt) => {
    const rect = evt.target.getBoundingClientRect();
    const offsetX = evt.clientX - rect.left;
    const offsetY = evt.clientY - rect.top;
    setCirclePosition({ x: offsetX, y: offsetY });
  };

  return (
    // <div style={{ position: 'relative', display: 'inline-block' }}>
    //   <img src={Image} alt="" onClick={handleImageClick} />
    //   {circlePosition.x !== null && circlePosition.y !== null && (
    //     <div
    //       style={{
    //         position: 'absolute',
    //         left: circlePosition.x - 25, 
    //         top: circlePosition.y - 25, 
    //         width: 50,
    //         height: 50,
           
    //         border:"2px solid red"
    //       }}
    //     ></div>
    //   )}
    // </div>
    // <VideoPlayer/>
    <HeroAnimation/>
    // <FileUpload/>
    
  );
};

export default App;
