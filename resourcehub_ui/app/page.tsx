"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  Gift, 
  BookOpen, 
  Code, 
  ArrowRight, 
  BrainCircuit, 
  Sparkles, 
  Bot,
  Cloud,
  Database,
  Globe,
  Laptop,
  Monitor,
  PenTool,
  Rocket,
  Server,
  Settings,
  Shield,
  Terminal,
  Zap,
  Coffee,
  Cpu,
  FileCode,
  Layers,
  MessageSquare,
  Palette,
  Share2,
  Smartphone,
  Wrench
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface IconPosition {
  top: number;
  left: number;
  size: number;
  duration: number;
  variant: number;
}

const FloatingIcons = () => {
  const [iconPositions, setIconPositions] = useState<IconPosition[]>([]);
  const icons = [
    Code, BookOpen, Gift, BrainCircuit, Bot, Sparkles,
    Cloud, Database, Globe, Laptop, Monitor, PenTool,
    Rocket, Server, Settings, Shield, Terminal, Zap,
    Coffee, Cpu, FileCode, Layers, MessageSquare,
    Palette, Share2, Smartphone, Wrench
  ];

  useEffect(() => {
    const positions = icons.map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 1.5 + 0.8, // Slightly smaller range for better visibility
      duration: Math.random() * 10 + 20,
      variant: Math.floor(Math.random() * 3)
    }));
    setIconPositions(positions);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((Icon, index) => (
        iconPositions[index] && (
          <Icon
            key={index}
            className={`absolute text-primary/5 animate-float-${iconPositions[index].variant}`}
            style={{
              top: `${iconPositions[index].top}%`,
              left: `${iconPositions[index].left}%`,
              fontSize: `${iconPositions[index].size}rem`,
              animation: `float ${iconPositions[index].duration}s infinite linear`
            }}
          />
        )
      ))}
    </div>
  );
};

const featuredResources = [
  {
    title: "GitHub Student Developer Pack",
    description: "Get access to the best developer tools for free",
    icon: Code,
    category: "Development"
  },
  {
    title: "AWS Educate",
    description: "Access free cloud computing resources and training",
    icon: Cloud,
    category: "Cloud"
  },
  {
    title: "Figma Education",
    description: "Professional design tools for students",
    icon: PenTool,
    category: "Design"
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary relative overflow-hidden">
      <FloatingIcons />
      <div className="container mx-auto px-4 py-16 relative">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 blur-3xl" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary animate-gradient">
              Plan Your Next Project with AI
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 relative">
            Discover free tools, get personalized project plans, and build amazing things
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 relative">
            <Button
              size="lg"
              onClick={() => router.push('/chat')}
              className="group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Plan Your Project
                <BrainCircuit className="w-5 h-5 transition-transform group-hover:scale-110" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push('/search/all')}
              className="group"
            >
              <span className="flex items-center gap-2">
                Browse Resources
                <Gift className="w-5 h-5 transition-transform group-hover:scale-110" />
              </span>
            </Button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-4 relative">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for resources..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>

        {/* Featured Resources */}
        <section className="mb-16 relative">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow backdrop-blur-sm bg-background/80">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <resource.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{resource.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{resource.description}</p>
                  <div className="flex items-center text-sm">
                    <span className="text-primary">{resource.category}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-card rounded-2xl p-8 md:p-12 relative overflow-hidden backdrop-blur-sm bg-background/80">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
          <h2 className="text-3xl font-bold mb-4 relative">Join Our Community</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto relative">
            Sign up to get personalized resource recommendations, save your favorites,
            and connect with other students.
          </p>
          <div className="flex gap-4 justify-center relative">
            <Button asChild size="lg" className="group">
              <a href="/auth/signup" className="flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/auth/signin">Sign In</a>
            </Button>
          </div>
        </section>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 8s linear infinite;
        }

        @keyframes float-0 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(5deg); }
          50% { transform: translate(0, -20px) rotate(0deg); }
          75% { transform: translate(-10px, -10px) rotate(-5deg); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-15px, -15px) rotate(-3deg); }
          66% { transform: translate(15px, -15px) rotate(3deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(0, -20px) rotate(5deg); }
        }
        .animate-float-0 { animation: float-0 15s infinite ease-in-out; }
        .animate-float-1 { animation: float-1 18s infinite ease-in-out; }
        .animate-float-2 { animation: float-2 20s infinite ease-in-out; }
      `}</style>
    </main>
  );
}