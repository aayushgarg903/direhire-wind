import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Star, 
  Phone,
  Building, 
  Users, 
  Shield, 
  Clock, 
  ChevronRight,
  Menu,
  Bell,
  Search,
  Filter,
  Zap,
  Globe
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  
  const languages = {
    en: "English",
    hi: "हिंदी"
  };
  
  const translations = {
    en: {
      // Navigation
      home: "Home",
      memberships: "Memberships",
      support: "Support",
      boothServices: "Booth Services",
      login: "Login",
      signUp: "Sign Up",
      
      // Hero Section
      heroTitle: "Connect Workers with Customers",
      heroSubtitle: "An effective platform where workers get hired by customers without traveling too much. Perfect for construction and skilled services worldwide.",
      
      // Sign Up Cards
      joinAsWorker: "Join as Worker",
      workerDescription: "Find work opportunities near you. Build your reputation and grow your business.",
      buildReputation: "Build your reputation with reviews",
      workLocal: "Work in your local area",
      instantNotifications: "Get instant notifications",
      signUpAsWorker: "Sign Up as Worker",
      
      findWorkers: "Find Workers",
      customerDescription: "Get quality work done by skilled professionals in your area.",
      verifiedProfessionals: "Verified professionals only",
      quickResponse: "Quick response times",
      ratedServices: "Rated and reviewed services",
      signUpAsCustomer: "Sign Up as Customer",
      
      // Features
      locationMatching: "Location Based Matching",
      locationMatchingDesc: "Smart GPS matching connects you with workers and jobs in your immediate area, reducing travel time and costs.",
      verifiedRating: "Verified Rating System",
      verifiedRatingDesc: "Build trust with our comprehensive review and rating system. Only verified customers can leave reviews.",
      boothServicesTitle: "Booth Services",
      boothServicesDesc: "Physical booths citywide for those without smartphones. Simple KYC and direct contact system.",
      support247: "24/7 Support",
      support247Desc: "Round-the-clock customer support available anytime you need help. We're always here for you.",
      
      // How It Works
      howItWorks: "How DireHire Works",
      createProfile: "Create Your Profile",
      createProfileDesc: "Sign up as a worker or customer. Add your location, skills, and preferences to get started.",
      getMatched: "Get Matched",
      getMatchedDesc: "Our smart algorithm matches workers with nearby customers based on skills, ratings, and availability.",
      connectComplete: "Connect & Complete",
      connectCompleteDesc: "Connect directly, agree on terms, complete the work, and build your reputation with reviews.",
      
      // Booth Section
      cantUseSmartphones: "Can't Use Smartphones?",
      boothDescription: "Visit our citywide booths for simple KYC and direct contact when work opportunities arise. No technology needed - just walk in and get connected.",
      findNearestBooth: "Find Nearest Booth",
      callSupport: "Call Support",
      
      // Testimonials
      whatUsersSay: "What Our Users Say",
      testimonial1: "Found skilled workers for my construction project within hours. The location-based matching saved me so much time and money!",
      testimonial2: "As a worker, this platform has transformed my business. I get consistent work in my area and my ratings help me get better jobs.",
      testimonial3: "The booth service is perfect for my father who doesn't use smartphones. He gets work calls directly through their system.",
      
      // Final CTA
      readyToStart: "Ready to Get Started?",
      finalCtaDesc: "Join thousands of workers and customers already using DireHire to connect and complete projects efficiently.",
      joinAsWorkerBtn: "Join as Worker",
      findWorkersBtn: "Find Workers",
      findBoothBtn: "Find Booth"
    },
    hi: {
      // Navigation
      home: "होम",
      memberships: "सदस्यता",
      support: "सहायता",
      boothServices: "बूथ सेवाएं",
      login: "लॉगिन",
      signUp: "साइन अप",
      
      // Hero Section
      heroTitle: "श्रमिकों को ग्राहकों से जोड़ें",
      heroSubtitle: "एक प्रभावी प्लेटफॉर्म जहां श्रमिकों को बिना ज्यादा यात्रा के ग्राहकों द्वारा काम पर रखा जाता है। निर्माण और कुशल सेवाओं के लिए विश्वव्यापी रूप से उपयुक्त।",
      
      // Sign Up Cards
      joinAsWorker: "श्रमिक के रूप में जुड़ें",
      workerDescription: "अपने आस-पास काम के अवसर खोजें। अपनी प्रतिष्ठा बनाएं और अपना व्यवसाय बढ़ाएं।",
      buildReputation: "समीक्षाओं के साथ अपनी प्रतिष्ठा बनाएं",
      workLocal: "अपने स्थानीय क्षेत्र में काम करें",
      instantNotifications: "तुरंत सूचनाएं प्राप्त करें",
      signUpAsWorker: "श्रमिक के रूप में साइन अप करें",
      
      findWorkers: "श्रमिक खोजें",
      customerDescription: "अपने क्षेत्र में कुशल पेशेवरों से गुणवत्तापूर्ण काम कराएं।",
      verifiedProfessionals: "केवल सत्यापित पेशेवर",
      quickResponse: "त्वरित प्रतिक्रिया समय",
      ratedServices: "रेटेड और समीक्षित सेवाएं",
      signUpAsCustomer: "ग्राहक के रूप में साइन अप करें",
      
      // Features
      locationMatching: "स्थान आधारित मैचिंग",
      locationMatchingDesc: "स्मार्ट GPS मैचिंग आपको आपके तत्काल क्षेत्र में श्रमिकों और नौकरियों से जोड़ता है, यात्रा समय और लागत कम करता है।",
      verifiedRating: "सत्यापित रेटिंग सिस्टम",
      verifiedRatingDesc: "हमारी व्यापक समीक्षा और रेटिंग प्रणाली के साथ विश्वास बनाएं। केवल सत्यापित ग्राहक ही समीक्षा छोड़ सकते हैं।",
      boothServicesTitle: "बूथ सेवाएं",
      boothServicesDesc: "स्मार्टफोन न रखने वालों के लिए शहरव्यापी भौतिक बूथ। सरल KYC और प्रत्यक्ष संपर्क प्रणाली।",
      support247: "24/7 सहायता",
      support247Desc: "जब भी आपको सहायता की आवश्यकता हो, चौबीसों घंटे ग्राहक सहायता उपलब्ध। हम हमेशा आपके लिए यहां हैं।",
      
      // How It Works
      howItWorks: "DireHire कैसे काम करता है",
      createProfile: "अपना प्रोफाइल बनाएं",
      createProfileDesc: "श्रमिक या ग्राहक के रूप में साइन अप करें। शुरुआत करने के लिए अपना स्थान, कौशल और प्राथमिकताएं जोड़ें।",
      getMatched: "मैच हो जाएं",
      getMatchedDesc: "हमारा स्मार्ट एल्गोरिदम कौशल, रेटिंग और उपलब्धता के आधार पर श्रमिकों को आस-पास के ग्राहकों से मिलाता है।",
      connectComplete: "जुड़ें और पूरा करें",
      connectCompleteDesc: "सीधे जुड़ें, शर्तों पर सहमति दें, काम पूरा करें, और समीक्षाओं के साथ अपनी प्रतिष्ठा बनाएं।",
      
      // Booth Section
      cantUseSmartphones: "स्मार्टफोन का उपयोग नहीं कर सकते?",
      boothDescription: "काम के अवसर आने पर सरल KYC और प्रत्यक्ष संपर्क के लिए हमारे शहरव्यापी बूथों पर जाएं। कोई तकनीक की आवश्यकता नहीं - बस अंदर जाएं और जुड़ें।",
      findNearestBooth: "निकटतम बूथ खोजें",
      callSupport: "सहायता कॉल करें",
      
      // Testimonials
      whatUsersSay: "हमारे उपयोगकर्ता क्या कहते हैं",
      testimonial1: "घंटों के भीतर अपने निर्माण प्रोजेक्ट के लिए कुशल श्रमिक मिल गए। स्थान-आधारित मैचिंग ने मेरा बहुत समय और पैसा बचाया!",
      testimonial2: "एक श्रमिक के रूप में, इस प्लेटफॉर्म ने मेरे व्यवसाय को बदल दिया है। मुझे अपने क्षेत्र में लगातार काम मिलता है और मेरी रेटिंग मुझे बेहतर नौकरियां दिलाने में मदद करती है।",
      testimonial3: "बूथ सेवा मेरे पिता के लिए बिल्कुल सही है जो स्मार्टफोन का उपयोग नहीं करते। उन्हें उनके सिस्टम के माध्यम से सीधे काम की कॉल आती है।",
      
      // Final CTA
      readyToStart: "शुरू करने के लिए तैयार हैं?",
      finalCtaDesc: "हजारों श्रमिकों और ग्राहकों के साथ जुड़ें जो पहले से ही DireHire का उपयोग करके प्रभावी रूप से जुड़ रहे हैं और परियोजनाओं को पूरा कर रहे हैं।",
      joinAsWorkerBtn: "श्रमिक के रूप में जुड़ें",
      findWorkersBtn: "श्रमिक खोजें",
      findBoothBtn: "बूथ खोजें"
    }
  };
  
  const t = translations[language as keyof typeof translations];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-x-hidden">
      {/* Enhanced Navigation with 3D Effects */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              {/* Logo with 3D Animation */}
              <div className="flex items-center space-x-2 group cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-primary/30">
                  <span className="text-primary-foreground font-bold text-sm transition-all duration-300 group-hover:scale-110">DH</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                  DireHire
                </span>
              </div>
              
              {/* Navigation Links with 3D Hover Effects */}
              <div className="hidden md:flex items-center space-x-6">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-md">
                  {t.home}
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-md"
                  onClick={() => navigate("/memberships")}
                >
                  {t.memberships}
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-md"
                  onClick={() => navigate("/support")}
                >
                  {t.support}
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-md"
                  onClick={() => navigate("/booth-services")}
                >
                  {t.boothServices}
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-auto min-w-[120px] border-0 bg-transparent hover:bg-muted/50 focus:ring-0">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🇺🇸</span>
                      English
                    </div>
                  </SelectItem>
                  <SelectItem value="hi">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🇮🇳</span>
                      हिंदी
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              
              {/* Action Buttons with 3D Effects */}
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/auth?mode=login")}
                  className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
                >
                  {t.login}
                </Button>
                <Button 
                  onClick={() => navigate("/auth?mode=signup")}
                  className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30"
                >
                  {t.signUp}
                </Button>
              </div>
              
              {/* Mobile Menu */}
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Visual Enhancement */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent transform transition-all duration-1000 hover:scale-105">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 transform transition-all duration-700 hover:scale-102 opacity-90 hover:opacity-100">
              {t.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <Button 
                onClick={() => navigate("/auth?mode=signup")}
                size="lg"
                className="bg-primary hover:bg-primary/90 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Get Started Today
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                onClick={() => navigate("/booth-services")}
                variant="outline"
                size="lg"
                className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Find Booth Services
              </Button>
            </div>
          </div>
          
          {/* Hero Image/Illustration */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 transform transition-all duration-500 hover:scale-105 hover:rotate-1">
              {/* Construction Worker Illustration */}
              <div className="text-center">
                <div 
                  className="text-8xl mb-4 animate-bounce cursor-pointer hover:scale-110 transition-transform duration-300"
                  onClick={() => navigate("/auth?mode=signup")}
                  title="Sign up to get started"
                >
                  👷‍♂️
                </div>
                <div className="flex justify-center gap-4 mb-4">
                  <div 
                    className="text-3xl animate-pulse cursor-pointer hover:scale-125 transition-transform duration-300"
                    onClick={() => navigate("/auth")}
                    title="Join skilled workers"
                  >
                    🔨
                  </div>
                  <div 
                    className="text-3xl animate-pulse delay-100 cursor-pointer hover:scale-125 transition-transform duration-300"
                    onClick={() => navigate("/booth-services")}
                    title="Find booth services"
                  >
                    🏗️
                  </div>
                  <div 
                    className="text-3xl animate-pulse delay-200 cursor-pointer hover:scale-125 transition-transform duration-300"
                    onClick={() => navigate("/auth?mode=signup")}
                    title="Get instant connections"
                  >
                    ⚡
                  </div>
                </div>
                <div 
                  className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
                  onClick={() => navigate("/auth")}
                >
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Connect Instantly</h3>
                  <p className="text-sm text-gray-600">Workers & Customers in your area</p>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div 
                className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full p-3 animate-pulse cursor-pointer hover:scale-110 transition-transform duration-300"
                onClick={() => navigate("/booth-services")}
                title="Find nearby locations"
              >
                <MapPin className="h-6 w-6" />
              </div>
              <div 
                className="absolute -bottom-4 -left-4 bg-secondary text-secondary-foreground rounded-full p-3 animate-pulse delay-300 cursor-pointer hover:scale-110 transition-transform duration-300"
                onClick={() => navigate("/auth")}
                title="Build your reputation"
              >
                <Star className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>



        {/* Sign Up Options with 3D Effects */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <Card className="hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/30 transform hover:scale-105 hover:-translate-y-2 hover:rotate-1 group cursor-pointer">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-primary/40">
                <Users className="h-8 w-8 text-primary-foreground transition-all duration-300 group-hover:scale-110" />
              </div>
              <CardTitle className="text-2xl">{t.joinAsWorker}</CardTitle>
              <CardDescription className="text-base">
                {t.workerDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{t.buildReputation}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span>{t.workLocal}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="h-4 w-4 text-green-500" />
                  <span>{t.instantNotifications}</span>
                </div>
              </div>
              <Button 
                onClick={() => navigate("/auth")}
                className="w-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
                size="lg"
              >
                {t.signUpAsWorker}
                <ChevronRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl transition-all duration-500 border-2 hover:border-secondary/30 transform hover:scale-105 hover:-translate-y-2 hover:-rotate-1 group cursor-pointer">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12 group-hover:shadow-lg group-hover:shadow-secondary/40">
                <Shield className="h-8 w-8 text-secondary-foreground transition-all duration-300 group-hover:scale-110" />
              </div>
              <CardTitle className="text-2xl">{t.findWorkers}</CardTitle>
              <CardDescription className="text-base">
                {t.customerDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>{t.verifiedProfessionals}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span>{t.quickResponse}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{t.ratedServices}</span>
                </div>
              </div>
              <Button 
                onClick={() => navigate("/auth")}
                variant="secondary"
                className="w-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary/30"
                size="lg"
              >
                {t.signUpAsCustomer}
                <ChevronRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features with Enhanced Visual Icons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer" onClick={() => navigate("/auth")} title="Start matching with workers">
            <CardContent className="p-6">
              <div className="relative w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <div className="text-2xl mb-1">🗺️</div>
                <MapPin className="h-4 w-4 text-white absolute bottom-1 right-1" />
              </div>
              <h4 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">{t.locationMatching}</h4>
              <p className="text-muted-foreground text-sm">{t.locationMatchingDesc}</p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer" onClick={() => navigate("/rating")} title="View our rating verification system">
            <CardContent className="p-6">
              <div className="relative w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <div className="text-2xl mb-1">⭐</div>
                <Star className="h-4 w-4 text-white absolute bottom-1 right-1" />
              </div>
              <h4 className="font-semibold mb-2 group-hover:text-yellow-600 transition-colors">{t.verifiedRating}</h4>
              <p className="text-muted-foreground text-sm">{t.verifiedRatingDesc}</p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer" onClick={() => navigate("/booth-services")} title="Find booth services near you">
            <CardContent className="p-6">
              <div className="relative w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <div className="text-2xl mb-1">🏢</div>
                <Building className="h-4 w-4 text-white absolute bottom-1 right-1" />
              </div>
              <h4 className="font-semibold mb-2 group-hover:text-green-600 transition-colors">{t.boothServices}</h4>
              <p className="text-muted-foreground text-sm">{t.boothServicesDesc}</p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer" onClick={() => navigate("/support")} title="Get 24/7 support">
            <CardContent className="p-6">
              <div className="relative w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <div className="text-2xl mb-1">🕐</div>
                <Clock className="h-4 w-4 text-white absolute bottom-1 right-1" />
              </div>
              <h4 className="font-semibold mb-2 group-hover:text-purple-600 transition-colors">{t.support247}</h4>
              <p className="text-muted-foreground text-sm">{t.support247Desc}</p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works with Enhanced Visual Icons */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">{t.howItWorks}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group cursor-pointer" onClick={() => navigate("/auth?mode=signup")} title="Create your profile to get started">
              <div className="relative w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg group-hover:shadow-xl">
                <div className="text-3xl mb-1">📝</div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-primary font-bold text-sm shadow-md">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{t.createProfile}</h3>
              <p className="text-muted-foreground">{t.createProfileDesc}</p>
            </div>
            <div className="text-center group cursor-pointer" onClick={() => navigate("/auth")} title="Get matched with the right opportunities">
              <div className="relative w-20 h-20 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg group-hover:shadow-xl">
                <div className="text-3xl mb-1">🎯</div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-secondary font-bold text-sm shadow-md">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-secondary transition-colors">{t.getMatched}</h3>
              <p className="text-muted-foreground">{t.getMatchedDesc}</p>
            </div>
            <div className="text-center group cursor-pointer" onClick={() => navigate("/auth")} title="Connect and complete your work">
              <div className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg group-hover:shadow-xl">
                <div className="text-3xl mb-1">🤝</div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 font-bold text-sm shadow-md">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-green-600 transition-colors">{t.connectComplete}</h3>
              <p className="text-muted-foreground">{t.connectCompleteDesc}</p>
            </div>
          </div>
        </div>

        {/* Booth Services Section */}
        <Card className="bg-gradient-to-r from-accent/20 to-muted/50 border-2">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-accent-foreground" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">{t.cantUseSmartphones}</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t.boothDescription}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={() => navigate("/booth-services")}
                size="lg"
                className="flex items-center gap-2"
              >
                <MapPin className="h-4 w-4" />
                {t.findNearestBooth}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="flex items-center gap-2"
                onClick={() => navigate("/support")}
              >
                <Phone className="h-4 w-4" />
                {t.callSupport}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <div className="mt-16 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">{t.whatUsersSay}</h2>
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
                  "{t.testimonial1}"
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
                  "{t.testimonial2}"
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
                  "{t.testimonial3}"
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
            <h2 className="text-3xl font-bold mb-4">{t.readyToStart}</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t.finalCtaDesc}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg"
                onClick={() => navigate("/auth")}
                className="flex items-center gap-2"
              >
                <Users className="h-5 w-5" />
                {t.joinAsWorkerBtn}
              </Button>
              <Button 
                size="lg"
                variant="secondary"
                onClick={() => navigate("/auth")}
                className="flex items-center gap-2"
              >
                <Search className="h-5 w-5" />
                {t.findWorkersBtn}
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate("/booth-services")}
                className="flex items-center gap-2"
              >
                <MapPin className="h-5 w-5" />
                {t.findBoothBtn}
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
                <Button variant="link" className="p-0 h-auto text-muted-foreground" onClick={() => navigate("/booth-services")}>
                  Find Booth Services
                </Button>
                <Button variant="link" className="p-0 h-auto text-muted-foreground" onClick={() => navigate("/rating")}>
                  Rate Workers
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
