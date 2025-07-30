import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Clock, Users, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BoothServices = () => {
  const navigate = useNavigate();

  const nearbyBooths = [
    {
      id: 1,
      name: "DireHire Center - Downtown",
      address: "123 Main Street, Downtown District",
      phone: "+1 (555) 123-4567",
      hours: "Mon-Sat: 8:00 AM - 6:00 PM",
      services: ["Worker Registration", "Job Matching", "KYC Verification"],
      waitTime: "5-10 mins",
      distance: "0.8 km"
    },
    {
      id: 2,
      name: "DireHire Hub - North Plaza", 
      address: "456 North Avenue, Plaza Complex",
      phone: "+1 (555) 234-5678",
      hours: "Mon-Sat: 9:00 AM - 7:00 PM",
      services: ["Worker Registration", "Customer Support", "Document Assistance"],
      waitTime: "10-15 mins",
      distance: "2.1 km"
    },
    {
      id: 3,
      name: "DireHire Point - East Market",
      address: "789 Market Road, East District",
      phone: "+1 (555) 345-6789", 
      hours: "Mon-Fri: 8:30 AM - 5:30 PM",
      services: ["Quick Registration", "Job Alerts", "Basic Support"],
      waitTime: "3-8 mins",
      distance: "1.5 km"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Booth Services</h1>
            <p className="text-muted-foreground">Physical support centers for workers without smartphones</p>
          </div>
        </div>

        {/* How It Works Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🏢</span>
              How Booth Services Work
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">1. Visit Any Booth</h3>
                <p className="text-sm text-muted-foreground">
                  Come to our physical locations citywide with your identification documents
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="font-semibold mb-2">2. Complete KYC</h3>
                <p className="text-sm text-muted-foreground">
                  Our staff will help you complete registration and verify your skills
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">3. Get Direct Calls</h3>
                <p className="text-sm text-muted-foreground">
                  We'll call you directly when matching work opportunities are available
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Find Nearest Booth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input 
                placeholder="Enter your location or pin code"
                className="flex-1"
              />
              <Button>
                <MapPin className="w-4 h-4 mr-2" />
                Search Nearby
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Booth Locations */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Nearby DireHire Booths</h2>
          
          <div className="grid gap-6">
            {nearbyBooths.map((booth) => (
              <Card key={booth.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{booth.name}</h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {booth.address}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {booth.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {booth.hours}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                        {booth.distance} away
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Wait time: {booth.waitTime}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Services Available:</h4>
                    <div className="flex flex-wrap gap-2">
                      {booth.services.map((service) => (
                        <span 
                          key={service}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      Get Directions
                    </Button>
                    <Button variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Booth
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Requirements Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>What to Bring</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Required Documents:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Government-issued ID (Passport, Driver's License, etc.)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Proof of address (Utility bill, Bank statement)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Work experience certificates (if available)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Skills certification (if any)
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Registration Process:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Document verification (5-10 minutes)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Skills assessment interview (10-15 minutes)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Profile creation and photo (5 minutes)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Contact preferences setup (2-3 minutes)
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BoothServices;