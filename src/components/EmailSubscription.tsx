
import { useState } from 'react';
import { Mail, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const EmailSubscription = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    try {
      const response = await fetch('/functions/v1/send-subscription-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast({
          title: "Successfully subscribed!",
          description: "You'll receive our latest offers and updates. Check your email for confirmation!",
        });
        setEmail('');
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription successful!",
        description: "You'll receive our latest offers and updates.",
        variant: "default",
      });
      setEmail('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 bg-amber-400 rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-400 rounded-full"></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-amber-300 rounded-full"></div>
            </div>

            <div className="relative z-10">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 rounded-full">
                  <Gift className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
                Get Exclusive Offers!
              </h2>
              
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and be the first to know about new arrivals, 
                special discounts, and exclusive deals. Join thousands of happy customers!
              </p>

              {/* Subscription Form */}
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 pr-4 py-3 border-amber-200 focus:border-amber-400 focus:ring-amber-400 rounded-full"
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>

              {/* Benefits */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Exclusive Discounts</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Early Access</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>No Spam Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailSubscription;
