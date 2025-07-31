import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">D</span>
            </div>
            <span className="text-xl font-bold">DireHire</span>
          </div>
          
          {/* Notification indicator */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full"></div>
            </div>
            <span className="text-sm text-muted-foreground">3 active requests</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Connect Workers with Customers
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            An effective platform where workers get hired by customers without traveling too much. 
            Perfect for construction and skilled services worldwide.
          </p>
        </div>

        {/* Sign Up Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <div className="bg-card border rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👷</span>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Join as Worker</h3>
            <p className="text-muted-foreground mb-6">
              Find work opportunities near you. Build your reputation and grow your business.
            </p>
            <button 
              onClick={() => navigate("/auth")}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Sign Up as Worker
            </button>
          </div>

          <div className="bg-card border rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏠</span>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Find Workers</h3>
            <p className="text-muted-foreground mb-6">
              Get quality work done by skilled professionals in your area.
            </p>
            <button 
              onClick={() => navigate("/auth")}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Sign Up as Customer
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">📍</span>
            </div>
            <h4 className="font-semibold mb-2">Location Based</h4>
            <p className="text-muted-foreground text-sm">Find workers and jobs in your local area</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">⭐</span>
            </div>
            <h4 className="font-semibold mb-2">Rating System</h4>
            <p className="text-muted-foreground text-sm">Build trust with verified reviews and ratings</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">📱</span>
            </div>
            <h4 className="font-semibold mb-2">Booth Services</h4>
            <p className="text-muted-foreground text-sm">Physical booths for non-smartphone users</p>
          </div>
        </div>

        {/* Booth Services Section */}
        <div className="bg-muted/50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">Can't Use Smartphones?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Visit our citywide booths for simple KYC and direct contact when work opportunities arise.
          </p>
          <button 
            onClick={() => navigate("/booth-services")}
            className="bg-accent text-accent-foreground hover:bg-accent/90 py-3 px-8 rounded-lg font-medium transition-colors"
          >
            Find Nearest Booth
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
