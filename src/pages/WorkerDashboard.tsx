import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, MapPin, Phone, Calendar, Crown } from "lucide-react";

const WorkerDashboard = () => {
  const [activeTab, setActiveTab] = useState("requests");

  const workRequests = [
    {
      id: 1,
      customer: "John Smith",
      location: "Downtown Area",
      workType: "Plumbing Repair",
      description: "Kitchen sink leak repair needed urgently",
      budget: "$150-200",
      date: "2024-01-15",
      urgent: true
    },
    {
      id: 2,
      customer: "Sarah Johnson",
      location: "Residential District",
      workType: "Electrical Work",
      description: "Install ceiling fan in living room",
      budget: "$100-150",
      date: "2024-01-16",
      urgent: false
    }
  ];

  const completedJobs = [
    {
      id: 1,
      customer: "Mike Davis",
      workType: "Bathroom Renovation",
      rating: 5,
      review: "Excellent work! Very professional and completed on time.",
      amount: "$850"
    },
    {
      id: 2,
      customer: "Lisa Brown",
      workType: "Kitchen Installation",
      rating: 4,
      review: "Good quality work, minor delays but overall satisfied.",
      amount: "$1200"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Worker Dashboard</h1>
            <p className="text-muted-foreground">Manage your work requests and profile</p>
          </div>
          <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700">
            <Crown className="w-4 h-4 mr-2" />
            Upgrade Membership
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Requests</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xl">📋</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed Jobs</p>
                  <p className="text-2xl font-bold">47</p>
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
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                  <div className="flex items-center gap-1">
                    <p className="text-2xl font-bold">4.8</p>
                    <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  </div>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">⭐</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">$3,240</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">💰</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={activeTab === "requests" ? "default" : "outline"}
            onClick={() => setActiveTab("requests")}
          >
            Work Requests
          </Button>
          <Button
            variant={activeTab === "completed" ? "default" : "outline"}
            onClick={() => setActiveTab("completed")}
          >
            Completed Jobs
          </Button>
          <Button
            variant={activeTab === "membership" ? "default" : "outline"}
            onClick={() => setActiveTab("membership")}
          >
            Membership Plans
          </Button>
        </div>

        {/* Content */}
        {activeTab === "requests" && (
          <div className="space-y-4">
            {workRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{request.customer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{request.customer}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {request.location}
                        </div>
                      </div>
                    </div>
                    {request.urgent && (
                      <Badge variant="destructive">Urgent</Badge>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">{request.workType}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{request.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-medium text-green-600">{request.budget}</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {request.date}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Accept Request
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "completed" && (
          <div className="space-y-4">
            {completedJobs.map((job) => (
              <Card key={job.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{job.customer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{job.customer}</h3>
                        <p className="text-sm text-muted-foreground">{job.workType}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{job.amount}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < job.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic">"{job.review}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "membership" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <p className="text-2xl font-bold">Free</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Access to work requests</li>
                  <li>✓ Basic profile</li>
                  <li>✓ Customer communication</li>
                  <li>✗ Priority listing</li>
                  <li>✗ Featured profile</li>
                </ul>
                <Button variant="outline" className="w-full mt-4" disabled>
                  Current Plan
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  Premium
                </CardTitle>
                <p className="text-2xl font-bold">$29<span className="text-sm font-normal">/month</span></p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Priority in search results</li>
                  <li>✓ Featured profile badge</li>
                  <li>✓ Advanced analytics</li>
                  <li>✓ Multiple skill categories</li>
                  <li>✓ Direct customer contact</li>
                </ul>
                <Button className="w-full mt-4">
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <p className="text-2xl font-bold">$49<span className="text-sm font-normal">/month</span></p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Top position guarantee</li>
                  <li>✓ Custom profile themes</li>
                  <li>✓ Instant notifications</li>
                  <li>✓ Business tools</li>
                  <li>✓ Marketing support</li>
                </ul>
                <Button className="w-full mt-4">
                  Upgrade to Pro
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerDashboard;