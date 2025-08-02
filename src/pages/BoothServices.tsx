import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Clock, Users, ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import LocationAutocomplete from "@/components/LocationAutocomplete";

const BoothServices = () => {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchLocation, setSearchLocation] = useState("");

  const nearbyBooths = [
    {
      id: 1,
      name: "DireHire Center - Downtown",
      address: "123 Main Street, Downtown District",
      phone: "+1 (555) 123-4567",
      hours: "Mon-Sat: 8:00 AM - 6:00 PM",
      services: ["Worker Registration", "Job Matching", "KYC Verification"],
      waitTime: "5-10 mins",
      distance: "0.8 km",
      coordinates: { lat: 40.7128, lng: -74.006 }
    },
    {
      id: 2,
      name: "DireHire Hub - North Plaza", 
      address: "456 North Avenue, Plaza Complex",
      phone: "+1 (555) 234-5678",
      hours: "Mon-Sat: 9:00 AM - 7:00 PM",
      services: ["Worker Registration", "Customer Support", "Document Assistance"],
      waitTime: "10-15 mins",
      distance: "2.1 km",
      coordinates: { lat: 40.7614, lng: -74.0059 }
    },
    {
      id: 3,
      name: "DireHire Point - East Market",
      address: "789 Market Road, East District",
      phone: "+1 (555) 345-6789", 
      hours: "Mon-Fri: 8:30 AM - 5:30 PM",
      services: ["Quick Registration", "Job Alerts", "Basic Support"],
      waitTime: "3-8 mins",
      distance: "1.5 km",
      coordinates: { lat: 40.7484, lng: -73.9857 }
    }
  ];

  const [filteredBooths, setFilteredBooths] = useState(nearbyBooths);

  // Filter booths based on search location
  const handleLocationSearch = (location: string) => {
    setSearchLocation(location);
    if (!location.trim()) {
      setFilteredBooths(nearbyBooths);
      return;
    }
    
    const filtered = nearbyBooths.filter(booth => 
      booth.name.toLowerCase().includes(location.toLowerCase()) ||
      booth.address.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredBooths(filtered);
  };

  const MapComponent = () => {
    useEffect(() => {
      if (!mapRef.current) return;

      // Show a functional fallback map with booth locations
      mapRef.current.innerHTML = `
        <div style="width: 100%; height: 400px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; position: relative; overflow: hidden;">
          <!-- Map Header -->
          <div style="position: absolute; top: 0; left: 0; right: 0; background: rgba(255,255,255,0.95); padding: 12px; z-index: 10;">
            <h4 style="margin: 0; font-weight: 600; color: #1f2937;">DireHire Booth Locations</h4>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #6b7280;">Click on locations below to view details</p>
          </div>
          
          <!-- Interactive Booth List -->
          <div style="position: absolute; top: 80px; left: 16px; right: 16px; bottom: 16px; overflow-y: auto;">
            ${nearbyBooths.map((booth, index) => `
              <div onclick="showBoothDetails(${index})" style="
                background: rgba(255,255,255,0.95); 
                margin-bottom: 12px; 
                padding: 16px; 
                border-radius: 8px; 
                cursor: pointer;
                transition: all 0.2s ease;
                border-left: 4px solid #3B82F6;
              " onmouseover="this.style.background='rgba(255,255,255,1)'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.95)'; this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                <div style="display: flex; justify-content: between; align-items: start; margin-bottom: 8px;">
                  <h5 style="margin: 0; font-weight: 600; color: #1f2937; font-size: 16px;">${booth.name}</h5>
                  <span style="background: #10B981; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 500;">OPEN</span>
                </div>
                <p style="margin: 4px 0; font-size: 13px; color: #6b7280; display: flex; align-items: center;">
                  <span style="margin-right: 6px;">📍</span> ${booth.address}
                </p>
                <p style="margin: 4px 0; font-size: 13px; color: #6b7280; display: flex; align-items: center;">
                  <span style="margin-right: 6px;">📞</span> ${booth.phone}
                </p>
                <p style="margin: 4px 0; font-size: 13px; color: #6b7280; display: flex; align-items: center;">
                  <span style="margin-right: 6px;">🕒</span> ${booth.hours}
                </p>
                <div style="margin-top: 8px; display: flex; gap: 8px; flex-wrap: wrap;">
                  ${booth.services.map(service => `
                    <span style="background: #EBF8FF; color: #1E40AF; padding: 4px 8px; border-radius: 4px; font-size: 11px;">${service}</span>
                  `).join('')}
                </div>
                <div style="margin-top: 8px; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 12px; color: #059669; font-weight: 500;">⏱️ Wait: ${booth.waitTime}</span>
                  <span style="font-size: 12px; color: #3B82F6; font-weight: 500;">📍 ${booth.distance}</span>
                </div>
              </div>
            `).join('')}
          </div>
          
          <!-- Decorative Elements -->
          <div style="position: absolute; top: 20%; right: -50px; width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.5;"></div>
          <div style="position: absolute; bottom: 20%; left: -30px; width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.3;"></div>
        </div>
      `;

      // Add click handler for booth details
      window.showBoothDetails = (index) => {
        const booth = nearbyBooths[index];
        alert(`${booth.name}\n\n${booth.address}\n${booth.phone}\n${booth.hours}\n\nServices: ${booth.services.join(', ')}\nWait Time: ${booth.waitTime}`);
      };
    }, []);

    return <div ref={mapRef} style={{ width: "100%", height: "400px", borderRadius: "8px" }} />;
  };

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

        {/* Location Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Find Booths Near You
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Search for DireHire booths in your area or any specific location
            </p>
          </CardHeader>
          <CardContent>
            <div className="max-w-md">
              <LocationAutocomplete
                value={searchLocation}
                onChange={handleLocationSearch}
                placeholder="Enter city, area, or address..."
                onLocationSelect={(location) => {
                  console.log('Selected location for booth search:', location);
                  // You could use the coordinates to find nearby booths
                }}
              />
            </div>
            {searchLocation && (
              <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-primary">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Showing booths near: <strong>{searchLocation}</strong>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Found {filteredBooths.length} booth{filteredBooths.length !== 1 ? 's' : ''} in this area
                </p>
              </div>
            )}
          </CardContent>
        </Card>

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

        {/* Interactive Map */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Booth Locations Map</CardTitle>
          </CardHeader>
          <CardContent>
            <MapComponent />
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                📍 Click on any marker to see booth details. Blue markers indicate DireHire booth locations.
              </p>
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