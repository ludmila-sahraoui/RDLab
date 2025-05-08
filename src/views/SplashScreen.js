import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layer1 from '../assets/icons/layer1.svg';
import Layer2 from '../assets/icons/layer2.svg';
import Layer3 from '../assets/icons/layer3.svg';
import Layer4 from '../assets/icons/layer4.svg';
import Fire from '../assets/icons/fire.svg';

export default function SplashScreen() {
  const navigate = useNavigate(); 
  const fullText = 'Your Intelligent Assistant for Smarter Oil & Gas Research.';
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false); 


  useEffect(() => {
    const startTypingDelay = 2000; 
  
    if (currentIndex === 0) {
      const startTimeout = setTimeout(() => {
        setCurrentIndex(1); 
        setDisplayedText(fullText[0]);
      }, startTypingDelay);
      return () => clearTimeout(startTimeout);
    }
  
    if (currentIndex > 0 && currentIndex < fullText.length) {
      const typingTimeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 40);
      return () => clearTimeout(typingTimeout);
    }
    if (currentIndex === fullText.length) {
      const redirectTimeout = setTimeout(() => {
        setFadeOut(true);
      }, 3000); 
      return () => clearTimeout(redirectTimeout);
    }
  }, [currentIndex, navigate]);
  
  // Navigate after fade-out animation
  useEffect(() => {
    if (fadeOut) {
      const navTimeout = setTimeout(() => {
        navigate('/landing');
      }, 800);
      return () => clearTimeout(navTimeout);
    }
  }, [fadeOut, navigate]);

  return (
    <div
      className={`flex items-center justify-center h-screen bg-purple-dark overflow-hidden transition-opacity duration-800 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex items-start space-x-6 relative w-[30%] h-[20%] min-w-[300px] min-h-[140px]">
        {/* Left logo box */}
        <div className="relative w-[22%] h-full">
          {/* Layered logo */}
          <div className="absolute w-full h-full">
            <motion.img
              src={Layer1}
              alt="Layer 1"
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="absolute bottom-0 w-full"
            />
            <motion.img
              src={Layer2}
              alt="Layer 2"
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute bottom-[27%] w-full"
            />
            <motion.img
              src={Layer3}
              alt="Layer 3"
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="absolute bottom-[54%] w-full"
            />
            <motion.img
              src={Layer4}
              alt="Layer 4"
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              className="absolute bottom-[78%] w-full"
            />
          </div>
        </div>

        {/* Right text column */}
        <div className="flex flex-col space-y-2 pt-5 relative">
          <motion.h1
            className="text-white text-6xl font-extrabold leading-none"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.4 }}
          >
            RDLab
          </motion.h1>
          <div className="text-white text-sm font-semibold leading-tight max-w-[240px] relative">
            <span>{displayedText}</span>
            {currentIndex > 0 && currentIndex < fullText.length && (
              <motion.img
                src={Fire}
                alt="Typing Fire"
                className="inline-block w-3 h-3 ml-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
