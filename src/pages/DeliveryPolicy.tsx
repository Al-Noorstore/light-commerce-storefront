
import { Truck, Clock, MapPin, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DeliveryPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-amber-200 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
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
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">Home</a>
              <a href="/#products" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">All Products</a>
              <a href="/contact" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">Contact Us</a>
            </nav>
          </div>
        </div>
      </header>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
              Delivery Policy
            </h1>
            <p className="text-gray-600 text-lg">Fast, reliable delivery across Pakistan</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="border-amber-100">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Truck className="h-8 w-8 text-amber-600" />
                  <CardTitle>Delivery Areas</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">We deliver nationwide across Pakistan including major cities and rural areas.</p>
              </CardContent>
            </Card>

            <Card className="border-amber-100">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Clock className="h-8 w-8 text-amber-600" />
                  <CardTitle>Delivery Time</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Standard delivery: 3-7 business days. Express delivery available in major cities.</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-amber-100">
            <CardHeader>
              <CardTitle className="text-2xl">Delivery Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Delivery Charges</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Standard delivery: PKR 150-300 (depending on location)</li>
                  <li>Express delivery: PKR 250-400</li>
                  <li>Free delivery on orders above PKR 3,000</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Delivery Process</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Orders are processed within 24 hours</li>
                  <li>You'll receive a tracking number via SMS/Email</li>
                  <li>Our delivery partner will contact you before delivery</li>
                  <li>Cash on Delivery (COD) available</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact for Delivery</h3>
                <p className="text-gray-600">
                  For any delivery related queries, contact us at{' '}
                  <a href="tel:+923222520101" className="text-amber-600 font-medium">+92 322 2520101</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default DeliveryPolicy;
