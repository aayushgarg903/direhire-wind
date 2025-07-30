import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Phone, Plus, Filter } from "lucide-react";

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("find-workers");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSkill, setFilterSkill] = useState("");

  const availableWorkers = [
    {
      id: 1,
      name: "Ahmed Khan",
      profession: "Mason",
      skillLevel: "Skilled",
      experience: "8 years",
      rating: 4.9,
      reviews: 127,
      location: "Downtown Area",
      hourlyRate: "$25-30",
      availability: "Available",
      profileImage: "AK",
      isPremium: true
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      profession: "Electrician",
      skillLevel: "Skilled", 
      experience: "5 years",
      rating: 4.7,
      reviews: 89,
      location: "North District",
      hourlyRate: "$30-35",
      availability: "Busy",
      profileImage: "MR",
      isPremium: false
    },
    {
      id: 3,
      name: "David Thompson",
      profession: "Plumber",
      skillLevel: "Skilled",
      experience: "12 years",
      rating: 4.8,
      reviews: 203,
      location: "Central Area",
      hourlyRate: "$28-33",
      availability: "Available",
      profileImage: "DT",
      isPremium: true
    }
  ];

  const myRequests = [
    {
      id: 1,
      title: "Kitchen Renovation",
      description: "Complete kitchen renovation including cabinets, countertops, and flooring",
      budget: "$5000-7000",
      status: "In Progress",
      applications: 8,
      worker: "Ahmed Khan",
      startDate: "2024-01-20"
    },
    {
      id: 2,
      title: "Bathroom Repair",
      description: "Fix leaking pipes and retile bathroom floor",
      budget: "$800-1200",
      status: "Pending",
      applications: 5,
      worker: null,
      startDate: null
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Customer Dashboard</h1>
            <p className="text-muted-foreground">Find skilled workers for your projects</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xl">🏗️</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed Jobs</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">✅</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">$24,500</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">💰</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Saved Workers</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">⭐</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={activeTab === "find-workers" ? "default" : "outline"}
            onClick={() => setActiveTab("find-workers")}
          >
            Find Workers
          </Button>
          <Button
            variant={activeTab === "my-requests" ? "default" : "outline"}
            onClick={() => setActiveTab("my-requests")}
          >
            My Requests
          </Button>
          <Button
            variant={activeTab === "completed" ? "default" : "outline"}
            onClick={() => setActiveTab("completed")}
          >
            Completed Projects
          </Button>
        </div>

        {/* Find Workers Tab */}
        {activeTab === "find-workers" && (
          <div>
            {/* Search and Filter */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search workers by profession, location, or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select onValueChange={setFilterSkill}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="skilled">Skilled</SelectItem>
                  <SelectItem value="unskilled">Unskilled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>

            {/* Workers List */}
            <div className="space-y-4">
              {availableWorkers.map((worker) => (
                <Card key={worker.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16">
                          <AvatarFallback className="text-lg">{worker.profileImage}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-semibold">{worker.name}</h3>
                            {worker.isPremium && (
                              <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600">
                                Premium
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground mb-1">{worker.profession} • {worker.skillLevel}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{worker.experience} experience</span>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {worker.location}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                          <span className="font-semibold">{worker.rating}</span>
                          <span className="text-muted-foreground">({worker.reviews})</span>
                        </div>
                        <p className="text-lg font-semibold text-green-600">{worker.hourlyRate}/hr</p>
                        <Badge 
                          variant={worker.availability === "Available" ? "default" : "secondary"}
                          className="mt-2"
                        >
                          {worker.availability}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1">
                        Hire Now
                      </Button>
                      <Button variant="outline">
                        <Phone className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                      <Button variant="outline" size="icon">
                        ❤️
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* My Requests Tab */}
        {activeTab === "my-requests" && (
          <div className="space-y-4">
            {myRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{request.title}</h3>
                      <p className="text-muted-foreground mb-3">{request.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-medium text-green-600">{request.budget}</span>
                        <span>{request.applications} applications</span>
                        {request.startDate && (
                          <span>Starts: {request.startDate}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={request.status === "In Progress" ? "default" : "secondary"}
                        className="mb-2"
                      >
                        {request.status}
                      </Badge>
                      {request.worker && (
                        <p className="text-sm text-muted-foreground">
                          Worker: {request.worker}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm">
                      View Applications
                    </Button>
                    <Button size="sm" variant="outline">
                      Edit Request
                    </Button>
                    {request.worker && (
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4 mr-2" />
                        Contact Worker
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Completed Projects Tab */}
        {activeTab === "completed" && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-4">No Completed Projects Yet</h3>
            <p className="text-muted-foreground mb-6">
              Start by posting your first job to find skilled workers in your area.
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Post Your First Job
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;