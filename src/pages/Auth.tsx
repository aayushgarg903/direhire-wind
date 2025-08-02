import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { API_ENDPOINTS } from "@/config/api";
import LocationAutocomplete from "@/components/LocationAutocomplete";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userType, setUserType] = useState<"worker" | "customer">("worker");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  // Handle URL parameters to set initial mode
  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'login') {
      setIsLogin(true);
    } else if (mode === 'signup') {
      setIsLogin(false);
    }
  }, [searchParams]);

  const [workerData, setWorkerData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    location: "",
    profession: "",
    skillLevel: "",
    workType: "",
    experience: ""
  });

  const [customerData, setCustomerData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    location: "",
    workNeeded: ""
  });

  const professions = [
    "Mason", "Carpenter", "Electrician", "Plumber", "Painter", 
    "Welder", "Roofer", "Flooring Specialist", "HVAC Technician", "Other"
  ];

  const workTypes = [
    "Residential Construction", "Commercial Construction", "Renovation",
    "Repair Work", "Maintenance", "Installation", "Other"
  ];

  const validateWorkerForm = () => {
    if (!workerData.email) {
      toast.error('Email is required');
      return false;
    }
    if (!workerData.password) {
      toast.error('Password is required');
      return false;
    }
    if (!isLogin) {
      if (!workerData.name) {
        toast.error('Full name is required');
        return false;
      }
      if (!workerData.phone) {
        toast.error('Phone number is required');
        return false;
      }
      if (!workerData.location) {
        toast.error('Location is required');
        return false;
      }
      if (!workerData.profession) {
        toast.error('Profession is required');
        return false;
      }
      if (!workerData.skillLevel) {
        toast.error('Skill level is required');
        return false;
      }
      if (!workerData.workType) {
        toast.error('Work type is required');
        return false;
      }
      if (!workerData.experience) {
        toast.error('Years of experience is required');
        return false;
      }
    }
    return true;
  };

  const handleWorkerAuth = async () => {
    if (!validateWorkerForm()) {
      return;
    }
    
    setLoading(true);
    try {
      if (isLogin) {
        // MongoDB worker login
        const response = await fetch(API_ENDPOINTS.auth.worker.login, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: workerData.email,
            password: workerData.password,
          }),
        });
        
        if (!response.ok) {
          throw new Error('Login failed');
        }
        
        const data = await response.json();
        // Store JWT token or session data
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userType', 'worker');
        
        toast.success("Successfully logged in!");
        navigate("/worker-dashboard");
      } else {
        // MongoDB worker signup
        const response = await fetch(API_ENDPOINTS.auth.worker.signup, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: workerData.email,
            password: workerData.password,
            name: workerData.name,
            phone: workerData.phone,
            location: workerData.location,
            profession: workerData.profession,
            skillLevel: workerData.skillLevel,
            workType: workerData.workType,
            experience: workerData.experience,
          }),
        });
        
        if (!response.ok) {
          throw new Error('Signup failed');
        }
        
        toast.success("Worker account created successfully! Please check your email to verify your account.");
        setIsLogin(true);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred during authentication";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerAuth = async () => {
    setLoading(true);
    try {
      if (isLogin) {
        // MongoDB customer login
        const response = await fetch(API_ENDPOINTS.auth.customer.login, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: customerData.email,
            password: customerData.password,
          }),
        });
        
        if (!response.ok) {
          throw new Error('Login failed');
        }
        
        const data = await response.json();
        // Store JWT token or session data
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userType', 'customer');
        
        toast.success("Successfully logged in!");
        navigate("/customer-dashboard");
      } else {
        // MongoDB customer signup
        const response = await fetch(API_ENDPOINTS.auth.customer.signup, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: customerData.email,
            password: customerData.password,
            name: customerData.name,
            phone: customerData.phone,
            location: customerData.location,
            workNeeded: customerData.workNeeded,
          }),
        });
        
        if (!response.ok) {
          throw new Error('Signup failed');
        }
        
        toast.success("Customer account created successfully! Please check your email to verify your account.");
        setIsLogin(true);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred during authentication";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold">Join DireHire</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <Tabs value={userType} onValueChange={(value) => setUserType(value as "worker" | "customer")}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="worker">Worker Signup</TabsTrigger>
              <TabsTrigger value="customer">Customer Signup</TabsTrigger>
            </TabsList>

            <TabsContent value="worker">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">👷</span>
                    Join as a Worker
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-4 mb-6">
                    <Button
                      variant={isLogin ? "default" : "outline"}
                      onClick={() => setIsLogin(true)}
                      className="flex-1"
                    >
                      Login
                    </Button>
                    <Button
                      variant={!isLogin ? "default" : "outline"}
                      onClick={() => setIsLogin(false)}
                      className="flex-1"
                    >
                      Sign Up
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {!isLogin && (
                      <div className="md:col-span-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name"
                          value={workerData.name}
                          onChange={(e) => setWorkerData({...workerData, name: e.target.value})}
                          placeholder="Enter your full name"
                        />
                      </div>
                    )}

                    <div className="md:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={workerData.email}
                        onChange={(e) => setWorkerData({...workerData, email: e.target.value})}
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password"
                        type="password"
                        value={workerData.password}
                        onChange={(e) => setWorkerData({...workerData, password: e.target.value})}
                        placeholder="Enter your password"
                      />
                    </div>

                    {!isLogin && (
                      <>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone"
                            value={workerData.phone}
                            onChange={(e) => setWorkerData({...workerData, phone: e.target.value})}
                            placeholder="Enter your phone"
                          />
                        </div>

                        <div>
                          <Label htmlFor="location">Location</Label>
                          <LocationAutocomplete
                            value={workerData.location}
                            onChange={(value) => setWorkerData({...workerData, location: value})}
                            placeholder="Enter your city/area"
                            onLocationSelect={(location) => {
                              // Store additional location data if needed
                              console.log('Selected location:', location);
                            }}
                          />
                        </div>

                        <div>
                          <Label htmlFor="profession">Profession</Label>
                          <Select onValueChange={(value) => setWorkerData({...workerData, profession: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your profession" />
                            </SelectTrigger>
                            <SelectContent>
                              {professions.map((prof) => (
                                <SelectItem key={prof} value={prof}>{prof}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="skillLevel">Skill Level</Label>
                          <Select onValueChange={(value) => setWorkerData({...workerData, skillLevel: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select skill level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="skilled">Skilled</SelectItem>
                              <SelectItem value="unskilled">Unskilled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="workType">Work Type</Label>
                          <Select onValueChange={(value) => setWorkerData({...workerData, workType: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Preferred work type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="solo">Solo Work</SelectItem>
                              <SelectItem value="group">Group Work</SelectItem>
                              <SelectItem value="both">Both</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="experience">Years of Experience</Label>
                          <Input 
                            id="experience"
                            type="number"
                            value={workerData.experience}
                            onChange={(e) => setWorkerData({...workerData, experience: e.target.value})}
                            placeholder="Years of experience"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleWorkerAuth}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : (isLogin ? "Login as Worker" : "Create Worker Account")}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="customer">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">🏠</span>
                    Join as a Customer
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-4 mb-6">
                    <Button
                      variant={isLogin ? "default" : "outline"}
                      onClick={() => setIsLogin(true)}
                      className="flex-1"
                    >
                      Login
                    </Button>
                    <Button
                      variant={!isLogin ? "default" : "outline"}
                      onClick={() => setIsLogin(false)}
                      className="flex-1"
                    >
                      Sign Up
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {!isLogin && (
                      <div>
                        <Label htmlFor="customerName">Full Name</Label>
                        <Input 
                          id="customerName"
                          value={customerData.name}
                          onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                          placeholder="Enter your full name"
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="customerEmail">Email</Label>
                      <Input 
                        id="customerEmail"
                        type="email"
                        value={customerData.email}
                        onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <Label htmlFor="customerPassword">Password</Label>
                      <Input 
                        id="customerPassword"
                        type="password"
                        value={customerData.password}
                        onChange={(e) => setCustomerData({...customerData, password: e.target.value})}
                        placeholder="Enter your password"
                      />
                    </div>

                    {!isLogin && (
                      <>
                        <div>
                          <Label htmlFor="customerPhone">Phone Number</Label>
                          <Input 
                            id="customerPhone"
                            value={customerData.phone}
                            onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                            placeholder="Enter your phone"
                          />
                        </div>

                        <div>
                          <Label htmlFor="customerLocation">Location</Label>
                          <LocationAutocomplete
                            value={customerData.location}
                            onChange={(value) => setCustomerData({...customerData, location: value})}
                            placeholder="Enter your city/area"
                            onLocationSelect={(location) => {
                              // Store additional location data if needed
                              console.log('Selected customer location:', location);
                            }}
                          />
                        </div>

                        <div>
                          <Label htmlFor="workNeeded">Type of Work Needed</Label>
                          <Select onValueChange={(value) => setCustomerData({...customerData, workNeeded: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="What kind of work do you need?" />
                            </SelectTrigger>
                            <SelectContent>
                              {workTypes.map((work) => (
                                <SelectItem key={work} value={work}>{work}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleCustomerAuth}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : (isLogin ? "Login as Customer" : "Create Customer Account")}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;