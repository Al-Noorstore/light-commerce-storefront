import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingBag, 
  Star, 
  Truck, 
  Shield, 
  Phone, 
  Mail, 
  MapPin,
  Settings,
  BarChart3,
  Lock
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const featuredProducts = [
    {
      id: 1,
      name: "Premium Face Cream",
      price: "PKR 2,500",
      originalPrice: "PKR 3,000",
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 124,
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: "PKR 8,500",
      originalPrice: "PKR 10,000",
      image: "/placeholder.svg",
      rating: 4.6,
      reviews: 89,
      badge: "New Arrival"
    },
    {
      id: 3,
      name: "Smart Watch",
      price: "PKR 15,000",
      originalPrice: "PKR 18,000",
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 156,
      badge: "Hot Deal"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">AN</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Al-Noor Store</h1>
                <p className="text-sm text-gray-600">Premium Quality Products</p>
              </div>
            </div>
            
            {/* Admin Access Buttons */}
            <div className="flex items-center space-x-2">
              <Link to="/test-admin">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center space-x-2 border-blue-200 hover:bg-blue-50"
                >
                  <Lock className="h-4 w-4" />
                  <span className="hidden sm:inline">Test Admin</span>
                </Button>
              </Link>
              
              <Link to="/admin">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center space-x-2 border-amber-200 hover:bg-amber-50"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin Panel</span>
                </Button>
              </Link>
              
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Al-Noor Store</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover premium quality products with exceptional service. From beauty essentials to electronics, we bring you the best at unbeatable prices.
          </p>
          
          {/* Admin Access Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {/* Test Admin Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-100">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Lock className="h-6 w-6 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-900">Test Admin Route</h3>
              </div>
              <p className="text-gray-600 mb-4">Verify that admin routing is working correctly</p>
              <Link to="/test-admin">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  Test Admin Access
                </Button>
              </Link>
            </div>

            {/* Full Admin Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-100">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <BarChart3 className="h-6 w-6 text-amber-500" />
                <h3 className="text-lg font-semibold text-gray-900">Full Admin Panel</h3>
              </div>
              <p className="text-gray-600 mb-4">Complete store management with Firebase auth</p>
              <Link to="/admin">
                <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                  Access Admin Panel
                </Button>
              </Link>
            </div>
          </div>

          {/* Access Info */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto">
            <h4 className="font-semibold text-green-800 mb-2">🔐 Admin Access Information</h4>
            <p className="text-green-700 text-sm">
              Only <strong>alnoormall.pk@gmail.com</strong> can access the admin panel via Firebase Auth
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600">Handpicked products just for you</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-orange-500">
                      {product.badge}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-gray-900">{product.price}</span>
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable delivery across Pakistan</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">100% authentic products with warranty</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Always here to help you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">AN</span>
                </div>
                <span className="text-xl font-bold">Al-Noor Store</span>
              </div>
              <p className="text-gray-400">Your trusted partner for premium quality products</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
                <li><Link to="/delivery-policy" className="text-gray-400 hover:text-white">Delivery Policy</Link></li>
                <li><Link to="/return-policy" className="text-gray-400 hover:text-white">Return Policy</Link></li>
                <li><Link to="/admin" className="text-gray-400 hover:text-amber-400">Admin Panel</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-gray-400">+92-300-1234567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span className="text-gray-400">alnoormall.pk@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-gray-400">Karachi, Pakistan</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <p className="text-gray-400">Stay connected for latest updates and offers</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 Al-Noor Store. All rights reserved. | Bringing Light to Your Life! | 
              <Link to="/admin" className="text-amber-400 hover:text-amber-300 ml-2">
                Admin Panel
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
