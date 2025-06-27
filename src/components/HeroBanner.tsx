
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=1200&h=600&fit=crop",
      title: "Premium Beauty Products",
      subtitle: "Discover our exclusive cosmetics collection",
      cta: "Shop Cosmetics"
    },
    {
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1200&h=600&fit=crop",
      title: "Elegant Home Decor",
      subtitle: "Transform your living spaces with style",
      cta: "Shop Home"
    },
    {
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=1200&h=600&fit=crop",
      title: "Quality Electronics",
      subtitle: "Latest gadgets and accessories",
      cta: "Shop Electronics"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-64 md:h-96 lg:h-[500px] overflow-hidden bg-gradient-to-r from-amber-100 to-orange-100">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? 'transform translate-x-0' : 
              index < currentSlide ? 'transform -translate-x-full' : 'transform translate-x-full'
            }`}
          >
            <div className="relative h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-start">
                <div className="container mx-auto px-4">
                  <div className="max-w-lg text-white">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl mb-6 text-gray-200 animate-fade-in animation-delay-150">
                      {slide.subtitle}
                    </p>
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in animation-delay-300"
                    >
                      {slide.cta}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Store Tagline Overlay */}
      <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500/90 to-orange-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full">
        <span className="text-sm font-medium">✨ Bringing Light to Your Life! ✨</span>
      </div>
    </div>
  );
};

export default HeroBanner;
