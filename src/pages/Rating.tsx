import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  Award, 
  Shield, 
  CheckCircle,
  AlertCircle,
  User,
  Calendar,
  MapPin,
  ArrowLeft,
  Send
} from "lucide-react";
import { toast } from "sonner";

const Rating = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const workerId = searchParams.get('workerId');
  const jobId = searchParams.get('jobId');
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ratingCategory, setRatingCategory] = useState({
    quality: 0,
    punctuality: 0,
    communication: 0,
    professionalism: 0
  });

  // Mock worker data - in real app, fetch from API
  const workerData = {
    id: workerId || "worker123",
    name: "Rajesh Kumar",
    profession: "Electrician",
    location: "Mumbai, Maharashtra",
    avatar: "👨‍🔧",
    completedJobs: 47,
    currentRating: 4.3,
    totalReviews: 23,
    joinDate: "2023-08-15"
  };

  const handleStarClick = (starValue: number) => {
    setRating(starValue);
  };

  const handleCategoryRating = (category: keyof typeof ratingCategory, value: number) => {
    setRatingCategory(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleSubmitRating = async () => {
    if (rating === 0) {
      toast.error("Please provide an overall rating");
      return;
    }

    if (review.trim().length < 10) {
      toast.error("Please provide a detailed review (at least 10 characters)");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Mock API call - replace with actual API endpoint
      const ratingData = {
        workerId: workerData.id,
        jobId: jobId || "job123",
        overallRating: rating,
        categoryRatings: ratingCategory,
        review: review.trim(),
        timestamp: new Date().toISOString()
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Rating submitted:", ratingData);
      
      toast.success("Rating submitted successfully! Thank you for your feedback.");
      
      // Redirect to worker profile or dashboard after successful submission
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      
    } catch (error) {
      toast.error("Failed to submit rating. Please try again.");
      console.error("Rating submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ 
    value, 
    onChange, 
    size = "w-8 h-8",
    readonly = false 
  }: { 
    value: number; 
    onChange?: (value: number) => void;
    size?: string;
    readonly?: boolean;
  }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} cursor-pointer transition-all duration-200 ${
              star <= (hoverRating || value)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 hover:text-yellow-400"
            } ${readonly ? "cursor-default" : "hover:scale-110"}`}
            onClick={() => !readonly && onChange && onChange(star)}
            onMouseEnter={() => !readonly && setHoverRating(star)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Rate & Review</h1>
                <p className="text-muted-foreground">Help others by sharing your experience</p>
              </div>
            </div>
            <Badge variant="secondary" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Verified Rating System
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Worker Profile Card */}
            <div className="md:col-span-1">
              <Card className="sticky top-4">
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">{workerData.avatar}</div>
                  <CardTitle className="flex items-center justify-center gap-2">
                    {workerData.name}
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </CardTitle>
                  <CardDescription>{workerData.profession}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {workerData.location}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Member since {new Date(workerData.joinDate).toLocaleDateString()}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Current Rating</span>
                      <div className="flex items-center gap-2">
                        <StarRating value={Math.floor(workerData.currentRating)} readonly size="w-4 h-4" />
                        <span className="text-sm font-bold">{workerData.currentRating}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{workerData.totalReviews} reviews</span>
                      <span>{workerData.completedJobs} jobs completed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Rating Form */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Overall Rating */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    Overall Rating
                  </CardTitle>
                  <CardDescription>
                    How would you rate your overall experience with {workerData.name}?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center gap-4">
                    <StarRating 
                      value={rating} 
                      onChange={handleStarClick}
                      size="w-12 h-12"
                    />
                    <div className="text-center">
                      {rating > 0 && (
                        <p className="text-lg font-semibold">
                          {rating === 1 && "Poor"}
                          {rating === 2 && "Fair"}
                          {rating === 3 && "Good"}
                          {rating === 4 && "Very Good"}
                          {rating === 5 && "Excellent"}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Category Ratings */}
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Ratings</CardTitle>
                  <CardDescription>
                    Rate specific aspects of the service
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { key: 'quality', label: 'Work Quality', icon: '🔧' },
                    { key: 'punctuality', label: 'Punctuality', icon: '⏰' },
                    { key: 'communication', label: 'Communication', icon: '💬' },
                    { key: 'professionalism', label: 'Professionalism', icon: '👔' }
                  ].map(({ key, label, icon }) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{icon}</span>
                        <Label className="font-medium">{label}</Label>
                      </div>
                      <StarRating
                        value={ratingCategory[key as keyof typeof ratingCategory]}
                        onChange={(value) => handleCategoryRating(key as keyof typeof ratingCategory, value)}
                        size="w-6 h-6"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Written Review */}
              <Card>
                <CardHeader>
                  <CardTitle>Written Review</CardTitle>
                  <CardDescription>
                    Share your detailed experience to help other customers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Describe your experience with the worker's service, quality of work, punctuality, communication, and any other relevant details..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="min-h-[120px]"
                    maxLength={500}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-muted-foreground">
                      {review.length}/500 characters
                    </span>
                    {review.length < 10 && (
                      <span className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Minimum 10 characters required
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <Button
                      onClick={handleSubmitRating}
                      disabled={isSubmitting || rating === 0 || review.length < 10}
                      className="flex-1 flex items-center gap-2"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Submit Rating & Review
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate(-1)}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium">Your review will be verified</p>
                        <p className="text-blue-600">
                          All ratings go through our verification system to ensure authenticity and help maintain platform quality.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;
