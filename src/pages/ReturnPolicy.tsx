
import { RotateCcw, Shield, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ReturnPolicy = () => {
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
              Return Policy
            </h1>
            <p className="text-gray-600 text-lg">Your satisfaction is our priority</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center border-amber-100">
              <CardHeader>
                <Clock className="h-12 w-12 text-amber-600 mx-auto mb-2" />
                <CardTitle>7 Days Return</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Return within 7 days of delivery</p>
              </CardContent>
            </Card>

            <Card className="text-center border-amber-100">
              <CardHeader>
                <Shield className="h-12 w-12 text-amber-600 mx-auto mb-2" />
                <CardTitle>Quality Guarantee</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Full refund for defective items</p>
              </CardContent>
            </Card>

            <Card className="text-center border-amber-100">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-amber-600 mx-auto mb-2" />
                <CardTitle>Easy Process</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Simple return procedure</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-amber-100">
            <CardHeader>
              <CardTitle className="text-2xl">Return Policy Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Eligible Returns</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Defective or damaged products</li>
                  <li>Wrong item received</li>
                  <li>Items not matching description</li>
                  <li>Unused items in original packaging</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Return Process</h3>
                <ol className="list-decimal list-inside text-gray-600 space-y-1">
                  <li>Contact us within 7 days at +92 322 2520101</li>
                  <li>Provide order details and reason for return</li>
                  <li>We'll arrange pickup or provide return address</li>
                  <li>Refund processed within 5-7 business days</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Non-Returnable Items</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Personal care items (cosmetics, perfumes)</li>
                  <li>Items used or damaged by customer</li>
                  <li>Items without original packaging</li>
                  <li>Customized or personalized products</li>
                </ul>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Need Help?</h3>
                <p className="text-gray-600">
                  Contact our customer service team at{' '}
                  <a href="tel:+923222520101" className="text-amber-600 font-medium">+92 322 2520101</a>
                  {' '}or email us at{' '}
                  <a href="mailto:alnoormall.pk@gmail.com" className="text-amber-600 font-medium">alnoormall.pk@gmail.com</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ReturnPolicy;
