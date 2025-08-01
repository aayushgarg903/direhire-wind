import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  FileText,
  Users,
  Shield,
  HelpCircle
} from "lucide-react";

const Support = () => {
  const navigate = useNavigate();

  const supportOptions = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Support",
      description: "Speak directly with our support team",
      contact: "+1 (800) 123-4567",
      hours: "24/7 Available",
      action: "Call Now"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      description: "Send us detailed questions via email",
      contact: "support@direhire.com",
      hours: "Response within 2 hours",
      action: "Send Email"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Live Chat",
      description: "Get instant help through live chat",
      contact: "Available on website",
      hours: "Mon-Fri: 9 AM - 8 PM",
      action: "Start Chat"
    }
  ];

  const faqItems = [
    {
      question: "How do I create a worker profile?",
      answer: "You can create a worker profile by signing up and selecting 'Join as Worker'. Fill in your skills, experience, and location details to get started."
    },
    {
      question: "How does the booth service work?",
      answer: "Booth services are physical locations where workers without smartphones can register and receive job notifications via phone calls. Visit any booth with your ID for registration."
    },
    {
      question: "What are the payment terms?",
      answer: "Workers receive payment directly from customers. DireHire facilitates the connection but doesn't handle payments. Terms are agreed upon between worker and customer."
    },
    {
      question: "How do I report an issue?",
      answer: "You can report issues through our contact form below, call our support number, or use the live chat feature on our website."
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
            We're Here to Help
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get the support you need, when you need it. Our dedicated team is ready to assist you with any questions or concerns.
          </p>
        </div>

        {/* Support Options */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {supportOptions.map((option, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  {option.icon}
                </div>
                <CardTitle className="text-xl">{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-2 mb-4">
                  <div className="font-semibold">{option.contact}</div>
                  <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                    <Clock className="h-4 w-4" />
                    {option.hours}
                  </div>
                </div>
                <Button className="w-full">
                  {option.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Send us a Message</CardTitle>
            <CardDescription className="text-center">
              Fill out the form below and we'll get back to you within 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" placeholder="your.email@example.com" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <Input placeholder="What can we help you with?" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea 
                  placeholder="Please describe your question or concern in detail..."
                  rows={6}
                />
              </div>
              
              <Button className="w-full" size="lg">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid gap-6 max-w-4xl mx-auto">
            {faqItems.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <HelpCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">{item.question}</h3>
                      <p className="text-muted-foreground">{item.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardContent className="p-6">
              <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Help Documentation</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Browse our comprehensive help articles and guides
              </p>
              <Button variant="outline" className="w-full">
                View Docs
              </Button>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Community Forum</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Connect with other users and share experiences
              </p>
              <Button variant="outline" className="w-full">
                Join Forum
              </Button>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Safety Guidelines</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Learn about our safety protocols and best practices
              </p>
              <Button variant="outline" className="w-full">
                Read Guidelines
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contact */}
        <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-red-800">Emergency Support</h3>
            <p className="text-red-700 mb-6">
              For urgent safety concerns or emergency situations, contact us immediately
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Emergency Hotline: +1 (800) 911-HIRE
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Support;