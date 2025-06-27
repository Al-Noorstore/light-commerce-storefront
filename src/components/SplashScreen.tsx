
import { useEffect, useState } from 'react';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 flex items-center justify-center z-50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center animate-scale-in">
        {/* Logo */}
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 mx-auto shadow-2xl animate-pulse">
          <span className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            AN
          </span>
        </div>
        
        {/* Brand Name */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
          Al-Noor Store
        </h1>
        
        {/* Tagline */}
        <p className="text-xl text-amber-100 font-medium animate-fade-in animation-delay-300">
          Bringing Light to Your Life!
        </p>
        
        {/* Loading Animation */}
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce animation-delay-150"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce animation-delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
