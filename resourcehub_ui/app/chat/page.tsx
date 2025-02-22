"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { 
  BrainCircuit, 
  Rocket, 
  PenTool, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Database,
  Code2,
  Layout,
  Server,
  Shield,
  Settings,
  Palette,
  Image as ImageIcon,
  Monitor,
  Smartphone,
  TabletSmartphone,
  Laptop,
  MessageSquare,
  Lightbulb,
  Layers,
  Cpu,
  Globe,
  GitBranch,
  ListChecks,
  PackageSearch,
  ChevronRight,
  FileCode,
  TestTube,
  FileText,
  Copy,
  CheckCheck
} from "lucide-react";

const STAGES = {
  INITIAL: {
    id: 'initial',
    title: 'Idea Honing',
    description: 'Define and refine your project concept through iterative Q&A',
    color: 'from-blue-500/20 to-blue-600/20',
    icon: Lightbulb,
    buttonText: 'Move to Planning',
    prompt: `Ask me one question at a time so we can develop a thorough, step-by-step spec for this idea. Each question should build on my previous answers, and our end goal is to have a detailed specification I can hand off to a developer. Let's do this iteratively and dig into every relevant detail.`
  },
  PLANNING: {
    id: 'planning',
    title: 'Project Planning',
    description: 'Break down the project into testable, iterative steps',
    color: 'from-green-500/20 to-green-600/20',
    icon: Layers,
    buttonText: 'Move to Development',
    prompt: `Draft a detailed, step-by-step blueprint for building this project. Break it down into small, iterative chunks that build on each other. Each step should be testable and contribute to the overall progress.`
  },
  DEVELOPMENT: {
    id: 'development',
    title: 'Development Setup',
    description: 'Initialize project with testing infrastructure',
    color: 'from-purple-500/20 to-purple-600/20',
    icon: FileCode,
    buttonText: 'Move to Testing',
    prompt: `Let's set up the development environment with all necessary tools and configurations. We'll establish the testing framework and create initial test cases.`
  },
  TESTING: {
    id: 'testing',
    title: 'Test Implementation',
    description: 'Test-driven development with incremental progress',
    color: 'from-orange-500/20 to-orange-600/20',
    icon: TestTube,
    buttonText: 'Move to Progress',
    prompt: `Following TDD principles, we'll write tests first, then implement features to pass those tests. Each iteration should include test cases, implementation, and refactoring.`
  },
  PROGRESS: {
    id: 'progress',
    title: 'Progress Tracking',
    description: 'Monitor development using todo checklist',
    color: 'from-cyan-500/20 to-cyan-600/20',
    icon: ListChecks,
    buttonText: 'Move to Summary',
    prompt: `Let's create a detailed todo.md checklist to track our progress. This will help ensure we don't miss any important steps in the development process.`
  },
  SUMMARY: {
    id: 'summary',
    title: 'Project Summary',
    description: 'Complete overview of your project plan',
    color: 'from-pink-500/20 to-pink-600/20',
    icon: FileText,
    buttonText: 'Start Over',
    prompt: `Let's review and summarize all the planning we've done.`
  }
} as const;

type StageType = typeof STAGES[keyof typeof STAGES]['id'];

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  stage: StageType;
  data?: any;
  needsReview?: boolean;
}

const generateStageResponse = (stage: StageType, input: string) => {
  switch (stage) {
    case 'initial':
      return {
        questions: [
          "What is the core problem your project aims to solve?",
          "Who are the primary users of your application?",
          "What are the must-have features for your MVP?"
        ],
        specification: {
          problem: "Problem statement based on user input",
          solution: "Proposed solution overview",
          keyFeatures: ["Feature 1", "Feature 2", "Feature 3"],
          targetAudience: "Identified user base",
          constraints: ["Technical limitations", "Time constraints", "Resource constraints"]
        }
      };

    case 'planning':
      return {
        blueprint: {
          phases: [
            {
              name: "Foundation Setup",
              tasks: ["Initialize repository", "Set up development environment", "Configure basic tooling"]
            },
            {
              name: "Core Implementation",
              tasks: ["Implement basic features", "Set up database", "Create API endpoints"]
            },
            {
              name: "Enhancement",
              tasks: ["Add advanced features", "Optimize performance", "Implement security measures"]
            }
          ],
          freeApis: {
            "Authentication & Users": [
              {
                name: "Supabase Auth",
                description: "Complete user authentication and management",
                url: "/search/development",
                features: ["Email/Password auth", "Social login", "JWT tokens"]
              },
              {
                name: "Auth0",
                description: "Identity platform with generous free tier",
                url: "/search/development",
                features: ["7,000 free active users", "Social connections", "Basic rules"]
              }
            ],
            "Storage & Database": [
              {
                name: "Supabase",
                description: "Open source Firebase alternative",
                url: "/search/cloud",
                features: ["PostgreSQL database", "Real-time subscriptions", "Storage"]
              },
              {
                name: "MongoDB Atlas",
                description: "Cloud-hosted MongoDB service",
                url: "/search/cloud",
                features: ["512MB storage", "Shared clusters", "Full MongoDB features"]
              }
            ],
            "Content & Media": [
              {
                name: "Cloudinary",
                description: "Media management platform",
                url: "/search/development",
                features: ["25 credits/month", "Image optimization", "Video transformation"]
              },
              {
                name: "Unsplash API",
                description: "High-quality photo library",
                url: "/search/design",
                features: ["50 requests/hour", "Full resolution images", "Commercial usage"]
              }
            ],
            "Development Tools": [
              {
                name: "GitHub Student Pack",
                description: "Collection of developer tools",
                url: "/search/github",
                features: ["Free private repos", "CI/CD minutes", "Cloud credits"]
              },
              {
                name: "Vercel",
                description: "Frontend deployment platform",
                url: "/search/hosting",
                features: ["Unlimited websites", "SSL certificates", "CI/CD"]
              }
            ]
          },
          timeline: "Estimated timeline based on complexity",
          dependencies: ["Required technologies", "External services", "Third-party integrations"]
        }
      };

    case 'development':
      return {
        setup: {
          environment: ["Node.js", "TypeScript", "Development IDE"],
          testing: ["Jest", "React Testing Library", "Cypress"],
          tooling: ["ESLint", "Prettier", "Husky"],
          configuration: ["tsconfig.json", "jest.config.js", "eslintrc.js"]
        }
      };

    case 'testing':
      return {
        testPlan: {
          unit: ["Component tests", "Utility function tests", "Hook tests"],
          integration: ["API integration tests", "Database operations", "Authentication flow"],
          e2e: ["User journey tests", "Critical path testing", "Edge cases"],
          coverage: "Minimum 80% code coverage target"
        }
      };

    case 'progress':
      return {
        checklist: {
          setup: ["✓ Project initialization", "✓ Development environment", "✓ Testing framework"],
          development: ["□ Core features", "□ API implementation", "□ Database setup"],
          testing: ["□ Unit tests", "□ Integration tests", "□ E2E tests"],
          deployment: ["□ CI/CD setup", "□ Production environment", "□ Monitoring"]
        }
      };

    case 'summary':
      return {
        summary: {
          projectOverview: {
            title: "Project Title",
            description: "A comprehensive description of the project",
            objectives: [
              "Primary objective 1",
              "Primary objective 2",
              "Primary objective 3"
            ]
          },
          technicalStack: {
            frontend: ["Next.js", "TypeScript", "Tailwind CSS"],
            backend: ["Node.js", "Express", "PostgreSQL"],
            deployment: ["Vercel", "Supabase", "GitHub Actions"]
          },
          implementation: {
            phases: [
              {
                name: "Phase 1: Foundation",
                tasks: ["Setup development environment", "Initialize project", "Configure tools"]
              },
              {
                name: "Phase 2: Core Features",
                tasks: ["Implement authentication", "Create database schema", "Build API endpoints"]
              },
              {
                name: "Phase 3: Enhancement",
                tasks: ["Add advanced features", "Optimize performance", "Implement security"]
              }
            ],
            timeline: "Estimated 12 weeks",
            milestones: [
              "Week 2: Basic functionality",
              "Week 6: Core features complete",
              "Week 10: Testing and optimization",
              "Week 12: Production deployment"
            ]
          },
          testing: {
            strategy: "Test-Driven Development (TDD)",
            coverage: "Minimum 80% code coverage",
            types: ["Unit Tests", "Integration Tests", "E2E Tests"]
          }
        }
      };

    default:
      return {};
  }
};

interface StageContentProps {
  stage: StageType;
  data: any;
  onRequestChanges: () => void;
}

const StageContent: React.FC<StageContentProps> = ({ stage, data, onRequestChanges }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatSummaryText = (summary: any) => {
    if (!summary) return '';
    
    return `# ${summary.projectOverview.title}

## Project Overview
${summary.projectOverview.description}

### Objectives
${summary.projectOverview.objectives.map((obj: string) => `- ${obj}`).join('\n')}

## Technical Stack

### Frontend
${summary.technicalStack.frontend.map((tech: string) => `- ${tech}`).join('\n')}

### Backend
${summary.technicalStack.backend.map((tech: string) => `- ${tech}`).join('\n')}

### Deployment
${summary.technicalStack.deployment.map((tech: string) => `- ${tech}`).join('\n')}

## Implementation Plan

${summary.implementation.phases.map((phase: any) => `
### ${phase.name}
${phase.tasks.map((task: string) => `- ${task}`).join('\n')}`).join('\n')}

### Timeline
${summary.implementation.timeline}

### Milestones
${summary.implementation.milestones.map((milestone: string) => `- ${milestone}`).join('\n')}

## Testing Strategy
- Strategy: ${summary.testing.strategy}
- Coverage Target: ${summary.testing.coverage}
- Test Types: ${summary.testing.types.join(', ')}`;
  };

  if (!data) return null;

  const renderContent = () => {
    switch (stage) {
      case 'initial':
        if (!data.specification) return null;
        return (
          <div className="space-y-4">
            <div className="p-4 rounded-lg border bg-background/50">
              <h3 className="font-semibold mb-3">Specification Overview</h3>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{data.specification.problem}</p>
                <p className="text-sm text-muted-foreground">{data.specification.solution}</p>
              </div>
            </div>
            <div className="p-4 rounded-lg border bg-background/50">
              <h3 className="font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {data.specification.keyFeatures?.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'planning':
        if (!data.blueprint) return null;
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Project Phases</h3>
              {data.blueprint.phases?.map((phase: any, index: number) => (
                <div key={index} className="p-4 rounded-lg border bg-background/50">
                  <h4 className="font-semibold mb-3">{phase.name}</h4>
                  <ul className="space-y-2">
                    {phase.tasks?.map((task: string, taskIndex: number) => (
                      <li key={taskIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Recommended Free APIs & Resources</h3>
              {data.blueprint.freeApis && Object.entries(data.blueprint.freeApis).map(([category, apis]: [string, any]) => (
                <div key={category} className="space-y-3">
                  <h4 className="font-medium text-primary">{category}</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    {apis?.map((api: any, index: number) => (
                      <div key={index} className="p-4 rounded-lg border bg-background/50 hover:bg-background/70 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-semibold">{api.name}</h5>
                          <Button variant="ghost" size="sm" asChild>
                            <a href={api.url} className="flex items-center gap-1">
                              <span className="text-xs">View</span>
                              <ArrowRight className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{api.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {api.features?.map((feature: string, featureIndex: number) => (
                            <span
                              key={featureIndex}
                              className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'development':
        if (!data.setup) return null;
        return (
          <div className="space-y-4">
            {Object.entries(data.setup).map(([key, items]: [string, any]) => (
              <div key={key} className="p-4 rounded-lg border bg-background/50">
                <h3 className="font-semibold mb-3 capitalize">{key}</h3>
                <div className="flex flex-wrap gap-2">
                  {items?.map((item: string, index: number) => (
                    <span key={index} className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'testing':
        if (!data.testPlan) return null;
        return (
          <div className="space-y-4">
            {Object.entries(data.testPlan).map(([key, items]: [string, any]) => (
              <div key={key} className="p-4 rounded-lg border bg-background/50">
                <h3 className="font-semibold mb-3 capitalize">{key}</h3>
                {Array.isArray(items) ? (
                  <ul className="space-y-2">
                    {items.map((item: string, index: number) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">{items}</p>
                )}
              </div>
            ))}
          </div>
        );

      case 'progress':
        if (!data.checklist) return null;
        return (
          <div className="space-y-4">
            {Object.entries(data.checklist).map(([key, items]: [string, any]) => (
              <div key={key} className="p-4 rounded-lg border bg-background/50">
                <h3 className="font-semibold mb-3 capitalize">{key}</h3>
                <ul className="space-y-2">
                  {items?.map((item: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      {item.startsWith('✓') ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="h-4 w-4 rounded border border-muted-foreground" />
                      )}
                      {item.replace(/^[✓□]\s/, '')}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      case 'summary':
        if (!data.summary) return null;
        const summaryText = formatSummaryText(data.summary);
        
        return (
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => copyToClipboard(summaryText)}
              >
                {copied ? (
                  <>
                    <CheckCheck className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Summary
                  </>
                )}
              </Button>
            </div>
            
            <div className="p-6 rounded-lg border bg-background/50 font-mono text-sm whitespace-pre-wrap">
              {summaryText}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {renderContent()}
    </div>
  );
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [currentStage, setCurrentStage] = useState<StageType>('initial');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      stage: currentStage
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const responseData = generateStageResponse(currentStage, input);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: "Here's what I've generated based on your input:",
      stage: currentStage,
      data: responseData,
      needsReview: true
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  }, [input, currentStage, isLoading]);

  const handleStageAdvance = useCallback((message: Message) => {
    const stageKeys = Object.keys(STAGES) as (keyof typeof STAGES)[];
    const currentIndex = stageKeys.findIndex(
      key => STAGES[key].id === currentStage
    );
    
    if (currentIndex < stageKeys.length - 1) {
      const nextStage = STAGES[stageKeys[currentIndex + 1]].id;
      setCurrentStage(nextStage);
      
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, needsReview: false } : msg
      ));

      setInput(STAGES[stageKeys[currentIndex + 1]].prompt);
    } else if (currentStage === 'summary') {
      // Reset the chat when completing the summary stage
      setMessages([]);
      setCurrentStage('initial');
      setInput(STAGES.INITIAL.prompt);
    }
  }, [currentStage]);

  const handleRequestChanges = useCallback(() => {
    setInput("I'd like to request the following changes: ");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex flex-col items-center justify-center gap-4">
            <BrainCircuit className="h-12 w-12 text-primary animate-pulse" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary animate-gradient">
              AI Project Planner
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Let's plan your project together, one step at a time
          </p>
        </div>

        <div className="flex justify-between mb-8 px-4">
          {Object.values(STAGES).map((stage) => {
            const isActive = currentStage === stage.id;
            const StageIcon = stage.icon;
            
            return (
              <div
                key={stage.id}
                className={`flex flex-col items-center ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div className={`p-2 rounded-full ${
                  isActive ? 'bg-primary/20' : 'bg-muted'
                }`}>
                  <StageIcon className="h-5 w-5" />
                </div>
                <span className="text-xs mt-2 hidden md:block">{stage.title}</span>
              </div>
            );
          })}
        </div>

        <div className="space-y-6">
          {messages.map((message) => {
            const stage = Object.values(STAGES).find(s => s.id === message.stage);
            
            return (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <Card className={`max-w-3xl w-full backdrop-blur-sm bg-background/80 ${
                  message.type === 'assistant' ? `bg-gradient-to-r ${stage?.color}` : ''
                }`}>
                  <CardHeader className="flex flex-row items-center gap-3">
                    {message.type === 'assistant' && stage && (
                      <div className="p-2 rounded-lg bg-primary/10">
                        <stage.icon className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-lg">
                        {message.type === 'user' ? 'Your Input' : stage?.title}
                      </CardTitle>
                      <CardDescription>
                        {message.type === 'user' ? 'Project details' : stage?.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{message.content}</p>
                    {message.data && (
                      <StageContent 
                        stage={message.stage} 
                        data={message.data}
                        onRequestChanges={handleRequestChanges}
                      />
                    )}
                  </CardContent>
                  {message.type === 'assistant' && message.needsReview && stage && (
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => handleRequestChanges()}
                      >
                        Request Changes
                      </Button>
                      <Button
                        onClick={() => handleStageAdvance(message)}
                        className="flex items-center gap-2"
                      >
                        {stage.buttonText}
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </div>
            );
          })}
        </div>

        <Card className="mt-6 backdrop-blur-sm bg-background/80">
          <CardContent className="p-4">
            <form onSubmit={handleSubmit} className="flex gap-4">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  messages.length === 0
                    ? "Describe your project idea..."
                    : "Provide additional context or request changes..."
                }
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                disabled={isLoading}
                className="self-end"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    Processing
                    <Sparkles className="h-4 w-4 animate-spin" />
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send
                    <MessageSquare className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chat;