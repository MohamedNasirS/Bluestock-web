
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app, you would call an API to send a password reset email
      // For now, we'll just simulate it with a timeout
      setTimeout(() => {
        setIsSubmitted(true);
        toast({
          title: "Reset email sent",
          description: `We've sent reset instructions to ${email}`,
        });
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send password reset email.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-blue-50">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gradient">BlueStock</h1>
        <p className="text-gray-600 mt-2">Your premium stock market portal</p>
      </div>
      
      <Card className="w-[380px] shadow-lg border-purple-100">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center font-bold">Forgot Password</CardTitle>
          <p className="text-center text-sm text-gray-500">
            {isSubmitted 
              ? "Password reset email sent. Check your inbox."
              : "Enter your email to receive a password reset link"}
          </p>
        </CardHeader>
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    Send reset link
                  </span>
                )}
              </Button>
              <div className="text-sm text-center space-y-2">
                <div>
                  <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                    Back to login
                  </Link>
                </div>
                <div>
                  <Link to="/" className="flex items-center justify-center text-sm text-gray-500 hover:text-gray-700 mt-2">
                    <ArrowLeft className="h-3 w-3 mr-1" />
                    Back to home
                  </Link>
                </div>
              </div>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-4">
            <p className="text-center mb-4">
              We've sent instructions to reset your password to <strong>{email}</strong>. 
              Please check your inbox and spam folder.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/login">
                <Button variant="outline">
                  Return to login
                </Button>
              </Link>
              <Button onClick={() => setIsSubmitted(false)}>
                Try again
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ForgotPassword;
