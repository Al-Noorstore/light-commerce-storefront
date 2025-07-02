import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, Gift, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("");

  const categories = [
    "All Products", "Cosmetics", "Clothes", "Kitchenware", 
    "Electronics", "Home Decor", "Accessories", "Sports & Fitness", "Shoes"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">AN</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Al-Noor Store</h1>
            </div>
            <Menu className="h-6 w-6 text-gray-600" />
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-full border-2 border-orange-200 focus:border-orange-400"
            />
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative h-80 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center px-4">
          <div className="inline-block bg-orange-500 px-4 py-2 rounded-full text-sm font-medium mb-4">
            ✨ Bringing Light to Your Life! ✨
          </div>
          <h2 className="text-4xl font-bold mb-4">Quality Electronics</h2>
          <p className="text-lg mb-6 opacity-90">Latest gadgets and accessories</p>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full">
            Shop Electronics
          </Button>
        </div>
        
        {/* Navigation Arrows */}
        <button className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/30 rounded-full flex items-center justify-center text-white">
          ‹
        </button>
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/30 rounded-full flex items-center justify-center text-white">
          ›
        </button>
        
        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </section>

      {/* Email Subscription */}
      <section className="py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gift className="h-8 w-8 text-white" />
            </div>
            
            <h3 className="text-3xl font-bold text-orange-600 mb-2">Get Exclusive</h3>
            <h3 className="text-3xl font-bold text-orange-600 mb-6">Offers!</h3>
            
            <p className="text-gray-600 mb-6">Subscribe to our newsletter and be the first to know about</p>
            
            <div className="space-y-4 mb-6">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border-2 border-orange-200 focus:border-orange-400 px-4 py-3"
              />
              <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 rounded-full">
                Subscribe
              </Button>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Exclusive Discounts</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Early Access</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600">No Spam Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section className="py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold text-orange-600 mb-4">Our Products</h2>
          <p className="text-gray-600 mb-8">
            Discover our carefully curated collection of premium products designed to brighten your everyday life.
          </p>
          
          {/* Category Grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {categories.map((category, index) => (
              <Button
                key={category}
                variant={index === 0 ? "default" : "outline"}
                className={`rounded-full py-3 ${
                  index === 0 
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white" 
                    : "border-orange-200 text-gray-700 hover:border-orange-400"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Featured Product */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg mb-6">
            <div className="relative">
              <img
                src="/placeholder.svg"
                alt="Birthday Cake"
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                20% OFF
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full rounded-full border-2 border-orange-300 text-orange-600 hover:bg-orange-50 py-3 font-semibold"
          >
            Load More Products
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">AN</span>
              </div>
              <h3 className="text-2xl font-bold">Al-Noor Store</h3>
            </div>
            <p className="text-amber-200 mb-6">Bringing Light to Your Life!</p>
            
            <div className="space-y-2 mb-8">
              <p className="text-amber-200">📞 +92 322 2520101</p>
              <p className="text-amber-200">📧 alnoormall.pk@gmail.com</p>
              <p className="text-amber-200">📍 Pakistan</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-amber-200 hover:text-white">Home</Link>
                <Link to="/products" className="block text-amber-200 hover:text-white">All Products</Link>
                <Link to="/contact" className="block text-amber-200 hover:text-white">Contact Us</Link>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">Policies</h4>
              <div className="space-y-2">
                <Link to="/delivery-policy" className="block text-amber-200 hover:text-white">Delivery Policy</Link>
                <Link to="/return-policy" className="block text-amber-200 hover:text-white">Return Policy</Link>
                <Link to="/faqs" className="block text-amber-200 hover:text-white">FAQs</Link>
                <Link to="/privacy-policy" className="block text-amber-200 hover:text-white">Privacy Policy</Link>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">Categories</h4>
              <div className="space-y-2">
                <p className="text-amber-200">Cosmetics</p>
                <p className="text-amber-200">Clothes</p>
                <p className="text-amber-200">Kitchenware</p>
                <p className="text-amber-200">Electronics</p>
              </div>
            </div>
          </div>

          <div className="border-t border-amber-800 mt-8 pt-6 text-center">
            <p className="text-amber-200 text-sm">
              © 2024 Al-Noor Store. All rights reserved. | 
              <Link to="/admin" className="text-amber-300 hover:text-white ml-1">
                Admin Panel
              </Link>
              <br />
              Bringing Light to Your Life!
            </p>
          </div>
        </div>
      </footer>

      <WhatsAppFloat />
    </div>
  );
};

export default Index;
