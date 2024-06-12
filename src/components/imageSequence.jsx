import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const HeroAnimation = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const imagesRef = useRef([]);
  const airpodsRef = useRef({ frame: 0 });

  const frameCount = 176;

  const currentFrame = index => (
    `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(index + 1).toString().padStart(4, '0')}.jpg`
    
  );


  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    contextRef.current = context;

    canvas.width = 1158;
    canvas.height = 770;

    const images = imagesRef.current;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    gsap.to(airpodsRef.current, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: render,
      scrollTrigger: {
        scrub: 0.5,
        onUpdate: self => {
          airpodsRef.current.frame = Math.round(self.progress * (frameCount - 1));
          render();
        }
      }
    });

    images[0].onload = render;

    return () => {
      imagesRef.current.forEach(img => {
        img.onload = null;
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      console.log('Scrolling...');
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const render = () => {
    const context = contextRef.current;
    const canvas = canvasRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(imagesRef.current[airpodsRef.current.frame], 0, 0);
  };

  return <canvas ref={canvasRef} id="hero-lightpass" />;
};

export default HeroAnimation;
