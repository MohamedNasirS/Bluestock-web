
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <nav className="flex justify-between items-center p-6">
        <div className="text-2xl font-bold text-purple-600">IPO Insight</div>
        <div className="space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Get Started</Link>
          </Button>
        </div>
      </nav>
      
      <main className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Track IPOs Like Never Before
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Stay ahead of the market with real-time IPO tracking, comprehensive analytics, and expert insights.
        </p>
        <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
          <Link to="/register">Start Tracking IPOs</Link>
        </Button>
      </main>
    </div>
  );
};

export default Index;
