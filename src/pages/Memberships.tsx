import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowLeft, Star, Crown, Zap } from "lucide-react";

const Memberships = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Basic",
      price: "$9.99",
      period: "/month",
      description: "Perfect for occasional workers",
      features: [
        "Up to 5 job applications per month",
        "Basic profile visibility",
        "Standard customer support",
        "Mobile app access",
        "Basic skill verification"
      ],
      color: "bg-muted",
      textColor: "text-muted-foreground",
      icon: <Zap className="h-6 w-6" />,
      popular: false
    },
    {
      name: "Professional",
      price: "$24.99",
      period: "/month",
      description: "Best for active professionals",
      features: [
        "Unlimited job applications",
        "Priority profile placement",
        "24/7 priority support",
        "Advanced analytics dashboard",
        "Professional skill certification",
        "Featured worker badge",
        "Direct customer messaging",
        "Booth service priority"
      ],
      color: "bg-primary",
      textColor: "text-primary-foreground",
      icon: <Star className="h-6 w-6" />,
      popular: true
    },
    {
      name: "Enterprise",
      price: "$49.99",
      period: "/month",
      description: "For teams and businesses",
      features: [
        "Everything in Professional",
        "Team management tools",
        "Custom branding options",
        "Dedicated account manager",
        "Advanced reporting & insights",
        "API access for integrations",
        "White-label booth services",
        "Custom contract templates",
        "Multi-location support",
        "Premium insurance coverage"
      ],
      color: "bg-gradient-to-br from-amber-500 to-orange-600",
      textColor: "text-white",
      icon: <Crown className="h-6 w-6" />,
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">D</span>
                </div>
                <span className="text-xl font-bold">DireHire</span>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock your potential with our flexible membership options. 
            From basic access to enterprise solutions, we have the perfect plan for you.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative hover:shadow-xl transition-all duration-300 ${
                plan.popular 
                  ? 'border-2 border-primary scale-105 shadow-lg' 
                  : 'hover:border-primary/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <div className={`w-16 h-16 ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4 ${plan.textColor}`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-primary hover:bg-primary/90' 
                      : ''
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  onClick={() => navigate("/auth")}
                >
                  {plan.popular ? 'Get Started' : 'Choose Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Compare All Features</CardTitle>
            <CardDescription className="text-center">
              See what's included in each membership tier
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-2">Feature</th>
                    <th className="text-center py-4 px-2">Basic</th>
                    <th className="text-center py-4 px-2">Professional</th>
                    <th className="text-center py-4 px-2">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b">
                    <td className="py-3 px-2">Job Applications</td>
                    <td className="text-center py-3 px-2">5/month</td>
                    <td className="text-center py-3 px-2">Unlimited</td>
                    <td className="text-center py-3 px-2">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Profile Visibility</td>
                    <td className="text-center py-3 px-2">Basic</td>
                    <td className="text-center py-3 px-2">Priority</td>
                    <td className="text-center py-3 px-2">Premium</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Customer Support</td>
                    <td className="text-center py-3 px-2">Standard</td>
                    <td className="text-center py-3 px-2">24/7 Priority</td>
                    <td className="text-center py-3 px-2">Dedicated Manager</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Analytics Dashboard</td>
                    <td className="text-center py-3 px-2">-</td>
                    <td className="text-center py-3 px-2">✓</td>
                    <td className="text-center py-3 px-2">Advanced</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">API Access</td>
                    <td className="text-center py-3 px-2">-</td>
                    <td className="text-center py-3 px-2">-</td>
                    <td className="text-center py-3 px-2">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Can I change my plan anytime?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                  and billing is prorated accordingly.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-muted-foreground text-sm">
                  We offer a 14-day free trial for the Professional plan. No credit card required to start.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground text-sm">
                  We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, we offer a 30-day money-back guarantee for all paid plans. No questions asked.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2">
          <CardContent className="text-center p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals already growing their careers with DireHire
            </p>
            <Button 
              size="lg"
              onClick={() => navigate("/auth")}
              className="mr-4"
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate("/")}
            >
              Learn More
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Memberships;