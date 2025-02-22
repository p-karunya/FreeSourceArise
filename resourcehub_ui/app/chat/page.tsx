"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BrainCircuit, Rocket, PenTool, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

// Mock AI response generator
function generateMockPlan(projectDescription: string) {
  return {
    title: "Project Plan",
    description: projectDescription,
    tools: [
      {
        name: "GitHub Student Developer Pack",
        description: "Essential development tools and services",
        url: "/search/github"
      },
      {
        name: "AWS Educate",
        description: "Cloud infrastructure and services",
        url: "/search/aws"
      },
      {
        name: "Visual Studio Code",
        description: "Powerful code editor with extensions",
        url: "/search/development"
      }
    ],
    steps: [
      "Set up development environment",
      "Design system architecture",
      "Implement core features",
      "Add authentication and security",
      "Deploy and monitor"
    ]
  };
}

export default function Chat() {
  const [projectDescription, setProjectDescription] = useState("");
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate plan directly in the client for static export
      const generatedPlan = generateMockPlan(projectDescription);
      setPlan(generatedPlan);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-background">
      <style jsx global>{`
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-text {
          background: linear-gradient(
            to right,
            #60A5FA,
            #3B82F6,
            #2563EB,
            #1D4ED8,
            #2563EB,
            #3B82F6
          );
          background-size: 200% auto;
          animation: gradient-flow 5s ease infinite;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }
      `}</style>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex flex-col items-center justify-center gap-4">
            <BrainCircuit className="h-12 w-12 text-primary animate-pulse" />
            <span className="gradient-text">Project Planner AI</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Describe your project idea and get a personalized plan with free resources
          </p>
        </div>

        <Card className="mb-8 backdrop-blur-sm bg-background/80">
          <CardHeader>
            <CardTitle>Describe Your Project</CardTitle>
            <CardDescription>
              Tell us about the project you want to build and we'll help you plan it
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="Example: I want to build a modern e-commerce platform with AI-powered product recommendations, secure payment processing, and a responsive design..."
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="min-h-[150px] resize-none"
                required
              />
              <Button
                type="submit"
                className="w-full relative overflow-hidden group"
                disabled={loading}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? "Generating Plan..." : "Generate Plan"}
                  <Sparkles className="h-4 w-4 transition-transform group-hover:scale-125" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {plan && (
          <div className="space-y-6">
            <Card className="backdrop-blur-sm bg-background/80">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-6 w-6 text-primary" />
                  Project Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{plan.description}</p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-background/80">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PenTool className="h-6 w-6 text-primary" />
                  Recommended Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {plan.tools.map((tool: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg border bg-background/50 hover:bg-background/80 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold">{tool.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {tool.description}
                        </p>
                      </div>
                      <Button variant="outline" asChild>
                        <a
                          href={tool.url}
                          className="flex items-center gap-2"
                        >
                          Access
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-background/80">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  Implementation Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {plan.steps.map((step: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-lg border bg-background/50 hover:bg-background/80 transition-colors"
                    >
                      <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}