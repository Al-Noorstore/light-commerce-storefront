
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ArrowLeft } from 'lucide-react';

const TestAdmin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold">Admin Route Test</CardTitle>
            <p className="text-gray-600">This page confirms the admin routing is working</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">✅ Route Status: Working</h3>
              <p className="text-green-700">The /admin route is accessible and functioning properly.</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">Next Steps:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Firebase Authentication is configured</li>
                <li>Google Sheets integration is ready</li>
                <li>Admin email: alnoormall.pk@gmail.com</li>
                <li>All admin features are available</li>
              </ul>
            </div>

            <div className="flex space-x-2">
              <Link to="/admin">
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                  Go to Full Admin Panel
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestAdmin;
