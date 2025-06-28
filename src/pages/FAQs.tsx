
import { HelpCircle, Phone, Mail, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQs = () => {
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
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600 text-lg">Find answers to common questions about Al-Noor Store</p>
          </div>

          <Card className="border-amber-100 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Common Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border border-amber-100 rounded-lg px-4">
                  <AccordionTrigger className="text-left font-semibold hover:text-amber-600">
                    How do I place an order?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2">
                    Browse our products, click "Buy Now" on any item you like, and you'll be redirected to our order form. Fill in your details and we'll contact you to confirm your order.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border border-amber-100 rounded-lg px-4">
                  <AccordionTrigger className="text-left font-semibold hover:text-amber-600">
                    What payment methods do you accept?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2">
                    We accept Cash on Delivery (COD), bank transfers, and mobile wallet payments like Easypaisa and JazzCash for your convenience.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border border-amber-100 rounded-lg px-4">
                  <AccordionTrigger className="text-left font-semibold hover:text-amber-600">
                    How long does delivery take?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2">
                    Standard delivery takes 3-7 business days across Pakistan. Express delivery is available in major cities for faster shipping.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border border-amber-100 rounded-lg px-4">
                  <AccordionTrigger className="text-left font-semibold hover:text-amber-600">
                    Do you offer free delivery?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2">
                    Yes! We offer free delivery on orders above PKR 3,000. For smaller orders, delivery charges range from PKR 150-300 depending on your location.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border border-amber-100 rounded-lg px-4">
                  <AccordionTrigger className="text-left font-semibold hover:text-amber-600">
                    Can I return or exchange products?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2">
                    Yes, we have a 7-day return policy for defective items, wrong products, or items not matching the description. Please contact us within 7 days of delivery.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6" className="border border-amber-100 rounded-lg px-4">
                  <AccordionTrigger className="text-left font-semibold hover:text-amber-600">
                    How can I track my order?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2">
                    Once your order is shipped, we'll send you a tracking number via SMS and email. You can use this to track your package with our delivery partner.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7" className="border border-amber-100 rounded-lg px-4">
                  <AccordionTrigger className="text-left font-semibold hover:text-amber-600">
                    Are your products authentic?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2">
                    Absolutely! We only sell 100% authentic products. All our items are sourced from authorized suppliers and come with quality guarantees.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8" className="border border-amber-100 rounded-lg px-4">
                  <AccordionTrigger className="text-left font-semibold hover:text-amber-600">
                    Do you have a physical store?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2">
                    We operate primarily online to offer you the best prices. However, you can contact us to arrange product viewing in major cities if needed.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card className="border-amber-100">
            <CardHeader>
              <CardTitle className="text-xl">Still Have Questions?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <Phone className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-800">Call Us</p>
                  <a href="tel:+923222520101" className="text-amber-600 hover:text-amber-700">
                    +92 322 2520101
                  </a>
                </div>
                <div className="text-center">
                  <Mail className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-800">Email Us</p>
                  <a href="mailto:alnoormall.pk@gmail.com" className="text-amber-600 hover:text-amber-700">
                    alnoormall.pk@gmail.com
                  </a>
                </div>
                <div className="text-center">
                  <MessageSquare className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-800">WhatsApp</p>
                  <a href="https://wa.me/923222520101" className="text-amber-600 hover:text-amber-700">
                    Chat with us
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default FAQs;
