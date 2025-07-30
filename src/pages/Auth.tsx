import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"worker" | "customer">("worker");
  const [isLogin, setIsLogin] = useState(true);

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
            <ArrowLeft className="w-4 h-4 mr-2" />
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
                          <Input 
                            id="location"
                            value={workerData.location}
                            onChange={(e) => setWorkerData({...workerData, location: e.target.value})}
                            placeholder="Enter your city/area"
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

                  <Button className="w-full" size="lg">
                    {isLogin ? "Login as Worker" : "Create Worker Account"}
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
                          <Input 
                            id="customerLocation"
                            value={customerData.location}
                            onChange={(e) => setCustomerData({...customerData, location: e.target.value})}
                            placeholder="Enter your city/area"
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

                  <Button className="w-full" size="lg">
                    {isLogin ? "Login as Customer" : "Create Customer Account"}
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