
import { Shield, Eye, Lock, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy = () => {
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
              Privacy Policy
            </h1>
            <p className="text-gray-600 text-lg">Your privacy and data security matter to us</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="text-center border-amber-100">
              <CardHeader>
                <Shield className="h-12 w-12 text-amber-600 mx-auto mb-2" />
                <CardTitle>Data Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">We secure your personal information with industry-standard encryption</p>
              </CardContent>
            </Card>

            <Card className="text-center border-amber-100">
              <CardHeader>
                <Lock className="h-12 w-12 text-amber-600 mx-auto mb-2" />
                <CardTitle>Secure Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">All payment information is processed securely</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-amber-100">
            <CardHeader>
              <CardTitle className="text-2xl">Privacy Policy Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Information We Collect</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Name, email address, and phone number for order processing</li>
                  <li>Delivery address for shipping purposes</li>
                  <li>Payment information (processed securely by payment providers)</li>
                  <li>Order history and preferences to improve your experience</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">How We Use Your Information</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate about your orders and provide customer support</li>
                  <li>Send promotional offers (with your consent)</li>
                  <li>Improve our products and services</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Information Sharing</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>We do not sell your personal information to third parties</li>
                  <li>Delivery information is shared only with our shipping partners</li>
                  <li>Payment data is processed by secure payment gateways</li>
                  <li>We may share information if required by law</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Rights</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Contact us about any privacy concerns</li>
                </ul>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Questions?</h3>
                <p className="text-gray-600">
                  If you have any questions about our privacy policy, contact us at{' '}
                  <a href="mailto:alnoormall.pk@gmail.com" className="text-amber-600 font-medium">alnoormall.pk@gmail.com</a>
                  {' '}or call{' '}
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

export default PrivacyPolicy;
