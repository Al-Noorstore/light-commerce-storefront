import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import ProductGrid from '@/components/ProductGrid';
import HeroBanner from '@/components/HeroBanner';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import EmailSubscription from '@/components/EmailSubscription';
import SplashScreen from '@/components/SplashScreen';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isPoliciesDropdownOpen, setIsPoliciesDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    'All Products',
    'Cosmetics',
    'Clothes',
    'Kitchenware', 
    'Electronics',
    'Home Decor',
    'Accessories',
    'Sports & Fitness',
    'Shoes'
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // Check if the search query matches a category
    const matchedCategory = categories.find(category => 
      category.toLowerCase().includes(query.toLowerCase()) && query.trim() !== ''
    );
    
    if (matchedCategory && matchedCategory !== 'All Products') {
      setSelectedCategory(matchedCategory);
      // Scroll to products section
      setTimeout(() => {
        const productsSection = document.getElementById('products');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (query.trim() === '') {
      setSelectedCategory('All Products');
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setIsProductsDropdownOpen(false);
    
    // Scroll to products section
    setTimeout(() => {
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-amber-200 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">AN</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Al-Noor Store
                </h1>
                <p className="text-xs text-gray-600 hidden sm:block">Bringing Light to Your Life!</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
                Home
              </a>
              
              {/* Products Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                  className="flex items-center text-gray-700 hover:text-amber-600 transition-colors font-medium"
                >
                  All Products
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {isProductsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-amber-100 py-2 z-50">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <a href="/contact" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
                Contact Us
              </a>

              {/* Policies Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsPoliciesDropdownOpen(!isPoliciesDropdownOpen)}
                  className="flex items-center text-gray-700 hover:text-amber-600 transition-colors font-medium"
                >
                  Policies
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {isPoliciesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-amber-100 py-2 z-50">
                    <a
                      href="/delivery-policy"
                      className="block px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                    >
                      Delivery Policy
                    </a>
                    <a
                      href="/return-policy"
                      className="block px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                    >
                      Return Policy
                    </a>
                    <a
                      href="/privacy-policy"
                      className="block px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                    >
                      Privacy Policy
                    </a>
                    <a
                      href="/faqs"
                      className="block px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                    >
                      FAQs
                    </a>
                  </div>
                )}
              </div>
            </nav>

            {/* Search Bar */}
            <div className="hidden sm:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search products or categories..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-amber-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Search */}
          <div className="sm:hidden mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products or categories..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-amber-200 focus:border-amber-400 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-amber-200 pt-4">
              <nav className="flex flex-col space-y-4">
                <a href="#home" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
                  Home
                </a>
                <div>
                  <div className="text-gray-700 font-medium mb-2">All Products</div>
                  <div className="pl-4 space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          handleCategorySelect(category);
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left text-gray-600 hover:text-amber-600 transition-colors"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                <a href="/contact" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
                  Contact Us
                </a>
                <div>
                  <div className="text-gray-700 font-medium mb-2">Policies</div>
                  <div className="pl-4 space-y-2">
                    <a href="/delivery-policy" className="block text-gray-600 hover:text-amber-600 transition-colors">
                      Delivery Policy
                    </a>
                    <a href="/return-policy" className="block text-gray-600 hover:text-amber-600 transition-colors">
                      Return Policy
                    </a>
                    <a href="/privacy-policy" className="block text-gray-600 hover:text-amber-600 transition-colors">
                      Privacy Policy
                    </a>
                    <a href="/faqs" className="block text-gray-600 hover:text-amber-600 transition-colors">
                      FAQs
                    </a>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Banner */}
      <section id="home">
        <HeroBanner />
      </section>

      {/* Email Subscription */}
      <EmailSubscription />

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
              {selectedCategory === 'All Products' ? 'Our Products' : selectedCategory}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {selectedCategory === 'All Products' 
                ? 'Discover our carefully curated collection of premium products designed to brighten your everyday life.'
                : `Browse our selection of ${selectedCategory.toLowerCase()} products.`
              }
            </p>
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                      : 'bg-white border border-amber-200 text-gray-700 hover:bg-amber-50 hover:border-amber-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <ProductGrid searchQuery={searchQuery} selectedCategory={selectedCategory} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-900 to-orange-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">AN</span>
                </div>
                <h3 className="text-xl font-bold">Al-Noor Store</h3>
              </div>
              <p className="text-amber-100 mb-4">Bringing Light to Your Life!</p>
              <div className="space-y-2 text-amber-100">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+92 322 2520101</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>alnoormall.pk@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Pakistan</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-amber-100">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">All Products</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Policies</h4>
              <ul className="space-y-2 text-amber-100">
                <li><a href="/delivery-policy" className="hover:text-white transition-colors">Delivery Policy</a></li>
                <li><a href="/return-policy" className="hover:text-white transition-colors">Return Policy</a></li>
                <li><a href="/faqs" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-amber-100">
                <li><a href="#cosmetics" className="hover:text-white transition-colors">Cosmetics</a></li>
                <li><a href="#clothes" className="hover:text-white transition-colors">Clothes</a></li>
                <li><a href="#kitchenware" className="hover:text-white transition-colors">Kitchenware</a></li>
                <li><a href="#electronics" className="hover:text-white transition-colors">Electronics</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-amber-800 mt-8 pt-8 text-center">
            <p className="text-amber-100">
              © 2024 Al-Noor Store. All rights reserved. | Bringing Light to Your Life!
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
