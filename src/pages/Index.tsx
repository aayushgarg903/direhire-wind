import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BackgroundScene } from "@/components/3d/BackgroundScene";
import { Card3D } from "@/components/3d/Card3D";
import { 
  MapPin, 
  Star, 
  Phone, 
  Users, 
  Shield, 
  Clock, 
  ChevronRight,
  Menu,
  Bell,
  Search,
  Filter,
  Zap
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* 3D Background Animation */}
      <div className="fixed inset-0 z-0 opacity-30">
        <BackgroundScene className="w-full h-full" />
      </div>
      {/* Enhanced Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">D</span>
                </div>
                <span className="text-xl font-bold">DireHire</span>
              </div>
              
              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-6">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  How it Works
                </Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Find Workers
                </Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Find Work
                </Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Booth Services
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Live Activity Indicator */}
              <div className="flex items-center space-x-2 bg-muted/50 rounded-full px-3 py-1">
                <div className="relative">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-green-600 rounded-full"></div>
                </div>
                <span className="text-sm text-muted-foreground">127 active workers</span>
              </div>
              
              {/* Action Buttons */}
              <Button variant="outline" onClick={() => navigate("/auth")}>
                Sign In
              </Button>
              <Button onClick={() => navigate("/auth")}>
                Get Started
              </Button>
              
              {/* Mobile Menu */}
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-12 relative">
          {/* 3D Construction Scene */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-96 max-w-md opacity-20">
              <BackgroundScene className="w-full h-full" showConstruction={true} />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent relative z-10">
            Connect Workers with Customers
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 relative z-10">
            An effective platform where workers get hired by customers without traveling too much. 
            Perfect for construction and skilled services worldwide.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button variant="outline" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Browse Workers
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Find Local Services
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Contact Support
          </Button>
        </div>

        {/* Sign Up Options with 3D Effects */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <div className="relative">
            <Card3D className="h-full">
              <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 bg-white/90 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">Join as Worker</CardTitle>
                  <CardDescription className="text-base">
                    Find work opportunities near you. Build your reputation and grow your business.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Build your reputation with reviews</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <span>Work in your local area</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Zap className="h-4 w-4 text-green-500" />
                      <span>Get instant notifications</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => navigate("/auth")}
                    className="w-full"
                    size="lg"
                  >
                    Sign Up as Worker
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Card3D>
          </div>

          <div className="relative">
            <Card3D className="h-full">
              <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-secondary/20 bg-white/90 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">Find Workers</CardTitle>
                  <CardDescription className="text-base">
                    Get quality work done by skilled professionals in your area.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Verified professionals only</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <span>Quick response times</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Rated and reviewed services</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => navigate("/auth")}
                    variant="secondary"
                    className="w-full"
                    size="lg"
                  >
                    Sign Up as Customer
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Card3D>
          </div>
        </div>

        {/* Stats Section with 3D Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center hover:scale-105 transition-transform duration-300 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">12,000+</div>
              <div className="text-sm text-muted-foreground">Active Workers</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:scale-105 transition-transform duration-300 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">8,500+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:scale-105 transition-transform duration-300 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:scale-105 transition-transform duration-300 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Location Based Matching</h4>
              <p className="text-muted-foreground text-sm">Smart GPS matching connects you with workers and jobs in your immediate area, reducing travel time and costs.</p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <h4 className="font-semibold mb-2">Verified Rating System</h4>
              <p className="text-muted-foreground text-sm">Build trust with our comprehensive review and rating system. Only verified customers can leave reviews.</p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Booth Services</h4>
              <p className="text-muted-foreground text-sm">Physical booths citywide for those without smartphones. Simple KYC and direct contact system.</p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How DireHire Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
              <p className="text-muted-foreground">Sign up as a worker or customer. Add your location, skills, and preferences to get started.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Matched</h3>
              <p className="text-muted-foreground">Our smart algorithm matches workers with nearby customers based on skills, ratings, and availability.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect & Complete</h3>
              <p className="text-muted-foreground">Connect directly, agree on terms, complete the work, and build your reputation with reviews.</p>
            </div>
          </div>
        </div>

        {/* Booth Services Section */}
        <Card className="bg-gradient-to-r from-accent/20 to-muted/50 border-2">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-accent-foreground" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Can't Use Smartphones?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Visit our citywide booths for simple KYC and direct contact when work opportunities arise. 
              No technology needed - just walk in and get connected.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={() => navigate("/booth-services")}
                size="lg"
                className="flex items-center gap-2"
              >
                <MapPin className="h-4 w-4" />
                Find Nearest Booth
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Call Support
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <div className="mt-16 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "Found skilled workers for my construction project within hours. The location-based matching saved me so much time and money!"
                </p>
                <div className="font-semibold">Sarah M.</div>
                <div className="text-sm text-muted-foreground">Construction Manager</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "As a worker, this platform has transformed my business. I get consistent work in my area and my ratings help me get better jobs."
                </p>
                <div className="font-semibold">Mike R.</div>
                <div className="text-sm text-muted-foreground">Skilled Electrician</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "The booth service is perfect for my father who doesn't use smartphones. He gets work calls directly through their system."
                </p>
                <div className="font-semibold">Ana L.</div>
                <div className="text-sm text-muted-foreground">Customer</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2">
          <CardContent className="text-center p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of workers and customers already using DireHire to connect and complete projects efficiently.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg"
                onClick={() => navigate("/auth")}
                className="flex items-center gap-2"
              >
                <Users className="h-5 w-5" />
                Join as Worker
              </Button>
              <Button 
                size="lg"
                variant="secondary"
                onClick={() => navigate("/auth")}
                className="flex items-center gap-2"
              >
                <Search className="h-5 w-5" />
                Find Workers
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate("/booth-services")}
                className="flex items-center gap-2"
              >
                <MapPin className="h-5 w-5" />
                Find Booth
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-muted/30 border-t mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">D</span>
                </div>
                <span className="text-xl font-bold">DireHire</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Connecting skilled workers with customers worldwide. Making construction and skilled services more efficient and accessible.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Workers</h4>
              <div className="space-y-2 text-sm">
                <Button variant="link" className="p-0 h-auto text-muted-foreground" onClick={() => navigate("/auth")}>
                  Sign Up as Worker
                </Button>
                <Button variant="link" className="p-0 h-auto text-muted-foreground">
                  Worker Dashboard
                </Button>
                <Button variant="link" className="p-0 h-auto text-muted-foreground">
                  Premium Membership
                </Button>
                <Button variant="link" className="p-0 h-auto text-muted-foreground">
                  Worker Guidelines
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Customers</h4>
              <div className="space-y-2 text-sm">
                <Button variant="link" className="p-0 h-auto text-muted-foreground" onClick={() => navigate("/auth")}>
                  Sign Up as Customer
                </Button>
                <Button variant="link" className="p-0 h-auto text-muted-foreground">
                  Browse Workers
                </Button>
                <Button variant="link" className="p-0 h-auto text-muted-foreground">
                  Post a Job
                </Button>
                <Button variant="link" className="p-0 h-auto text-muted-foreground">
                  Safety Guidelines
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm">
                <Button variant="link" className="p-0 h-auto text-muted-foreground" onClick={() => navigate("/booth-services")}>
                  Booth Services
                </Button>
                <Button variant="link" className="p-0 h-auto text-muted-foreground">
                  Help Center
                </Button>
                <Button variant="link" className="p-0 h-auto text-muted-foreground">
                  Contact Us
                </Button>
                <Button variant="link" className="p-0 h-auto text-muted-foreground">
                  Terms & Privacy
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 DireHire. All rights reserved. Making skilled work more accessible worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
