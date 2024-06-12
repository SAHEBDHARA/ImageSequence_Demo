import React, { useState, useEffect, useRef } from 'react';

const VideoPlayer = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      if (video) {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
      const percentage = (video.currentTime / video.duration) * 100;
      setCompletionPercentage(percentage);
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);
    }
  };


  const handlePercentageChange = (e) => {
    const value = parseFloat(e.target.value);
    setTimeout(()=>{
        if (!isNaN(value) && value >= 0 && value <= 100) {
            const video = videoRef.current;
            if (video) {
              const targetTime = (value / 100) * video.duration;
              video.currentTime = targetTime;
            }
          }
    },[1000])
 
  };

  return (
    <div>
      <video ref={videoRef} id="video" controls>
        <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p style={{ color: 'white' }}>Current Time: {currentTime.toFixed(2)} seconds</p>
      <p style={{ color: 'white' }}>Duration: {duration.toFixed(2)} seconds</p>
      <p style={{ color: 'white' }}>Completion Percentage: {completionPercentage.toFixed(2)}%</p>
      <input
        type="number"
        min="0"
        max="100"
        step="0.01"
        value=""
        onChange={handlePercentageChange}
        style={{ marginTop: '10px' }}
      />
    </div>
  );
};

export default VideoPlayer;
