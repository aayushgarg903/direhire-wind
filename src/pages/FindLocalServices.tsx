import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Clock, Users, ArrowLeft, Search, Filter, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const FindLocalServices = () => {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const localServices = [
    {
      id: 1,
      name: "Elite Construction Services",
      category: "Construction",
      address: "123 Builder Street, Downtown",
      phone: "+1 (555) 123-4567",
      rating: 4.8,
      reviews: 127,
      services: ["Home Construction", "Renovation", "Roofing"],
      distance: "0.5 km",
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: 2,
      name: "Quick Fix Plumbing",
      category: "Plumbing",
      address: "456 Water Lane, North District",
      phone: "+1 (555) 234-5678",
      rating: 4.6,
      reviews: 89,
      services: ["Emergency Plumbing", "Pipe Installation", "Water Heater Repair"],
      distance: "1.2 km",
      coordinates: { lat: 40.7614, lng: -74.0059 }
    },
    {
      id: 3,
      name: "PowerUp Electrical",
      category: "Electrical",
      address: "789 Electric Avenue, East Side",
      phone: "+1 (555) 345-6789",
      rating: 4.9,
      reviews: 156,
      services: ["Wiring", "Panel Upgrades", "Smart Home Installation"],
      distance: "2.1 km",
      coordinates: { lat: 40.7484, lng: -73.9857 }
    },
    {
      id: 4,
      name: "Green Thumb Landscaping",
      category: "Landscaping",
      address: "321 Garden Road, West Park",
      phone: "+1 (555) 456-7890",
      rating: 4.7,
      reviews: 203,
      services: ["Garden Design", "Tree Trimming", "Lawn Maintenance"],
      distance: "1.8 km",
      coordinates: { lat: 40.7282, lng: -74.0776 }
    }
  ];

  const MapComponent = () => {
    useEffect(() => {
      if (!mapRef.current) return;

      // Show a functional interactive service map
      mapRef.current.innerHTML = `
        <div style="width: 100%; height: 400px; background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); border-radius: 8px; position: relative; overflow: hidden;">
          <!-- Map Header -->
          <div style="position: absolute; top: 0; left: 0; right: 0; background: rgba(255,255,255,0.95); padding: 12px; z-index: 10;">
            <h4 style="margin: 0; font-weight: 600; color: #1f2937;">Local Service Locations</h4>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #6b7280;">Click on services below to view details and contact info</p>
          </div>
          
          <!-- Interactive Service List -->
          <div style="position: absolute; top: 80px; left: 16px; right: 16px; bottom: 16px; overflow-y: auto;">
            ${localServices.map((service, index) => `
              <div onclick="showServiceDetails(${index})" style="
                background: rgba(255,255,255,0.95); 
                margin-bottom: 12px; 
                padding: 16px; 
                border-radius: 8px; 
                cursor: pointer;
                transition: all 0.2s ease;
                border-left: 4px solid #3B82F6;
              " onmouseover="this.style.background='rgba(255,255,255,1)'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.95)'; this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                  <div>
                    <h5 style="margin: 0; font-weight: 600; color: #1f2937; font-size: 16px;">${service.name}</h5>
                    <span style="background: #EBF8FF; color: #1E40AF; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 500;">${service.category}</span>
                  </div>
                  <div style="text-align: right;">
                    <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 2px;">
                      <span style="color: #FFA500; font-size: 14px;">★</span>
                      <span style="font-weight: 600; color: #1f2937;">${service.rating}</span>
                      <span style="font-size: 11px; color: #6b7280;">(${service.reviews})</span>
                    </div>
                    <span style="font-size: 12px; color: #3B82F6; font-weight: 500;">${service.distance}</span>
                  </div>
                </div>
                <p style="margin: 4px 0; font-size: 13px; color: #6b7280; display: flex; align-items: center;">
                  <span style="margin-right: 6px;">📍</span> ${service.address}
                </p>
                <p style="margin: 4px 0; font-size: 13px; color: #6b7280; display: flex; align-items: center;">
                  <span style="margin-right: 6px;">📞</span> ${service.phone}
                </p>
                <div style="margin-top: 8px; display: flex; gap: 6px; flex-wrap: wrap;">
                  ${service.services.map(serviceItem => `
                    <span style="background: #F0FDF4; color: #166534; padding: 3px 6px; border-radius: 4px; font-size: 10px;">${serviceItem}</span>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
          
          <!-- Decorative Elements -->
          <div style="position: absolute; top: 15%; right: -40px; width: 80px; height: 80px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.6;"></div>
          <div style="position: absolute; bottom: 25%; left: -25px; width: 50px; height: 50px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.4;"></div>
        </div>
      `;

      // Add click handler for service details
      (window as Window & { showServiceDetails?: (index: number) => void }).showServiceDetails = (index: number) => {
        const service = localServices[index];
        alert(`${service.name}\n${service.category}\n\n${service.address}\n${service.phone}\n\nRating: ${service.rating}/5 (${service.reviews} reviews)\nDistance: ${service.distance}\n\nServices: ${service.services.join(', ')}`);
      };
    }, []);

    return <div ref={mapRef} style={{ width: "100%", height: "400px", borderRadius: "8px" }} />;
  };

  const filteredServices = localServices.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
            <h1 className="text-3xl font-bold">Find Local Services</h1>
            <p className="text-muted-foreground">Discover skilled workers and services in your area</p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search for services, categories, or worker names..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Near Me
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Services List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Available Services ({filteredServices.length})</h2>
            {filteredServices.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{service.name}</h3>
                      <p className="text-primary font-medium">{service.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{service.rating}</span>
                        <span className="text-sm text-muted-foreground">({service.reviews})</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {service.distance} away
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {service.address}
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Services:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.services.map((serviceItem) => (
                        <span 
                          key={serviceItem}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                        >
                          {serviceItem}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      Contact Worker
                    </Button>
                    <Button variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Map */}
          <div className="lg:sticky lg:top-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Service Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MapComponent />
                <p className="text-sm text-muted-foreground mt-4">
                  Click on markers to see service details. Blue markers indicate available workers in your area.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How to Find Local Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">1. Search</h3>
                <p className="text-sm text-muted-foreground">
                  Use our search to find workers by service type, location, or specific skills.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">2. Compare</h3>
                <p className="text-sm text-muted-foreground">
                  Review ratings, services offered, and distance to find the best match.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">3. Connect</h3>
                <p className="text-sm text-muted-foreground">
                  Contact workers directly through our platform or call them for immediate service.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FindLocalServices;
