
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Contact = () => {
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

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
                Home
              </a>
              <a href="/#products" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
                All Products
              </a>
              <a href="/contact" className="text-amber-600 font-medium">
                Contact Us
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
              Contact Us
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Get in touch with us for any questions, orders, or support. We're here to help!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Phone */}
            <Card className="text-center hover:shadow-lg transition-shadow border-amber-100">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-gray-800">Call Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">Customer Support</p>
                <a href="tel:+923222520101" className="text-amber-600 font-semibold text-lg hover:text-amber-700">
                  +92 322 2520101
                </a>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="text-center hover:shadow-lg transition-shadow border-amber-100">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-gray-800">Email Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">Send us a message</p>
                <a href="mailto:alnoormall.pk@gmail.com" className="text-amber-600 font-semibold hover:text-amber-700">
                  alnoormall.pk@gmail.com
                </a>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="text-center hover:shadow-lg transition-shadow border-amber-100">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-gray-800">Location</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">We serve across</p>
                <p className="text-amber-600 font-semibold">Pakistan</p>
              </CardContent>
            </Card>

            {/* Hours */}
            <Card className="text-center hover:shadow-lg transition-shadow border-amber-100">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-gray-800">Business Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">Available</p>
                <p className="text-amber-600 font-semibold">24/7 Online</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="max-w-2xl mx-auto border-amber-100">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-gray-800">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" 
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" 
                      placeholder="Your Phone Number"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" 
                    placeholder="Your Email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" 
                    placeholder="Message Subject"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows={5}
                    className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" 
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contact;
