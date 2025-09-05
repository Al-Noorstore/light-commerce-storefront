import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Gift, Snowflake, Sun } from "lucide-react";

const SeasonalBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const currentMonth = new Date().getMonth();
  const isWinter = currentMonth === 11 || currentMonth === 0 || currentMonth === 1; // Dec, Jan, Feb
  const isSummer = currentMonth >= 5 && currentMonth <= 7; // Jun, Jul, Aug

  const getSeasonalContent = () => {
    if (isWinter) {
      return {
        icon: Snowflake,
        title: "Winter Sale",
        subtitle: "Cozy up with amazing deals!",
        description: "Get up to 50% off on winter essentials and warm clothing",
        bgGradient: "from-blue-600 via-purple-600 to-indigo-700",
        accentColor: "text-blue-100",
        buttonClass: "bg-white text-blue-600 hover:bg-blue-50"
      };
    } else if (isSummer) {
      return {
        icon: Sun,
        title: "Summer Collection",
        subtitle: "Beat the heat in style!",
        description: "Discover our cool summer collection with refreshing deals",
        bgGradient: "from-orange-500 via-red-500 to-pink-600",
        accentColor: "text-orange-100",
        buttonClass: "bg-white text-orange-600 hover:bg-orange-50"
      };
    } else {
      return {
        icon: Gift,
        title: "Seasonal Offers",
        subtitle: "Special deals await you!",
        description: "Explore our curated collection with exclusive seasonal discounts",
        bgGradient: "from-emerald-600 via-teal-600 to-cyan-700",
        accentColor: "text-emerald-100",
        buttonClass: "bg-white text-emerald-600 hover:bg-emerald-50"
      };
    }
  };

  const seasonal = getSeasonalContent();
  const IconComponent = seasonal.icon;

  return (
    <section className={`relative overflow-hidden bg-gradient-to-r ${seasonal.bgGradient}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16 max-w-7xl">
        <div className="text-center">
          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Close banner"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Seasonal Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <IconComponent className="w-10 h-10 text-white" />
              </div>
              {/* Floating sparkles for visual appeal */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/30 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white/20 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>

          {/* Content */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            {seasonal.title}
          </h2>
          
          <p className={`text-xl md:text-2xl ${seasonal.accentColor} mb-3 font-medium`}>
            {seasonal.subtitle}
          </p>
          
          <p className={`text-lg ${seasonal.accentColor} mb-8 max-w-2xl mx-auto leading-relaxed`}>
            {seasonal.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              className={`${seasonal.buttonClass} font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              size="lg"
              onClick={() => {
                const productsSection = document.getElementById('products-section');
                if (productsSection) {
                  productsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Shop Now
            </Button>
            
            <Button 
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full font-semibold transition-all duration-300"
              size="lg"
            >
              View Deals
            </Button>
          </div>

          {/* Promotional Badge */}
          <div className="mt-8 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
            <Gift className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Free shipping on orders over Rs. 2,000</span>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-12 text-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
};

export default SeasonalBanner;