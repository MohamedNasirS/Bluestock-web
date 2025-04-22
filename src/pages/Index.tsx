
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, Mail, Clock, MapPin, PlayCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/50 border-b">
        <div className="container mx-auto flex justify-between items-center p-6">
          <div className="text-2xl font-bold text-purple-600">Bluestock Fintech</div>
          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Become a Better Investor & Trader
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Bluestock, your comprehensive stock market app, is here to redefine your trading experience
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
            <Link to="/register">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <PlayCircle className="w-5 h-5" />
            Watch Video
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-lg border bg-white hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-purple-600">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-purple-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">About Us</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-center text-lg">
            We are passionate about helping you succeed in the stock market by providing cutting-edge tools, 
            learning resources, and a supportive community of traders. Join us on this journey, and let's make 
            your stock trading experience better.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-purple-600">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-purple-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 rounded-lg bg-white border">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                {info.icon}
                <h3 className="text-lg font-semibold mt-4 mb-2">{info.title}</h3>
                <p className="text-gray-600">{info.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Bluestock Fintech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    title: "Shark Portfolio",
    description: "Track top investors' portfolios and their latest moves",
  },
  {
    title: "Stock Charts",
    description: "Access detailed stock charts for in-depth analysis",
  },
  {
    title: "Broker Compare",
    description: "Compare brokers to find the best trading platform",
  },
  {
    title: "Community",
    description: "Connect and engage with fintech enthusiasts globally",
  },
  {
    title: "Global Index",
    description: "Access real-time global stock market indices easily",
  },
  {
    title: "IPO Analytics",
    description: "Discover upcoming IPOs and investment opportunities instantly",
  },
];

const services = [
  {
    title: "IPO Data Feed (B2B)",
    description: "Get real-time data on upcoming IPOs, including pricing, timelines, and financials, tailored for business-to-business integration",
  },
  {
    title: "Startup News (API)",
    description: "Access the latest startup news and updates via API, featuring funding rounds, acquisitions, and industry trends for seamless integration",
  },
  {
    title: "Indices Data (EOD)",
    description: "Receive end-of-day index data, including closing prices, highs, lows, and volume, for comprehensive market analysis and reporting",
  },
];

const faqs = [
  {
    question: "Is the Bluestock app available on the Play Store?",
    answer: "Yes, the Bluestock app is available on the Play Store",
  },
  {
    question: "Is the Bluestock app available on the Apple App Store?",
    answer: "The Bluestock app is currently under development for the Apple App Store",
  },
  {
    question: "Does Bluestock Fintech provide trading tips?",
    answer: "No, Bluestock Fintech does not provide trading and investment tips",
  },
  {
    question: "Is the Bluestock app completely free?",
    answer: "Yes, the Bluestock app is completely free",
  },
];

const contactInfo = [
  {
    icon: <MapPin className="w-6 h-6 text-purple-600" />,
    title: "Address",
    content: "Bluestock Fintech, Pune, Maharashtra, IN 41450",
  },
  {
    icon: <Phone className="w-6 h-6 text-purple-600" />,
    title: "Phone",
    content: "+91 70382 0244",
  },
  {
    icon: <Mail className="w-6 h-6 text-purple-600" />,
    title: "Email",
    content: "contact@bluestock.com",
  },
  {
    icon: <Clock className="w-6 h-6 text-purple-600" />,
    title: "Open Hours",
    content: "Monday - Friday, 9:00 AM - 05:00 PM",
  },
];

export default Index;
