"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  User, 
  Mail, 
  KeyRound, 
  AtSign, 
  Github, 
  Code2, 
  Laptop, 
  Rocket, 
  Database, 
  Cloud,
  PenTool,
  Terminal,
  Globe,
  Cpu,
  Sparkles
} from "lucide-react";
import { MainAccount, Mainclient } from "@/components/appWrite";
import { Databases, ID } from "appwrite";

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
    Code2, Laptop, Rocket, Database, Cloud, PenTool, Terminal, Globe, Cpu
  ];

  useEffect(() => {
    const positions = icons.map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
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
            className={`absolute text-primary/10 animate-float-${iconPositions[index].variant}`}
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

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    isGithubStudent: false,
    isHackClubStudent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await MainAccount.create(
        ID.unique(),
        formData.email,
        formData.password,
        formData.name,
      );
      console.log(response); // Success

      await MainAccount.createEmailPasswordSession(
        formData.email,
        formData.password
      );

      console.log('User logged in successfully.');

      const databases = new Databases(Mainclient);
      const result = await databases.createDocument(
        '67b9d719001483b711ef', // databaseId
        '67b9d7dd001e709b233d', // collectionId
        response.$id, // documentId
        {
          Username: formData.username,
          GHStudent: formData.isGithubStudent,
          HCStudent: formData.isHackClubStudent
        }, // data
        ["read(\"any\")"] // permissions (optional)
      );

    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary relative flex items-center justify-center p-4">
      <FloatingIcons />
      
      <style jsx global>{`
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

      <Card className="w-full max-w-lg relative overflow-hidden backdrop-blur-sm bg-background/80">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 pointer-events-none" />
        
        <CardHeader>
          <div className="space-y-2 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 blur-3xl" />
            <CardTitle className="text-3xl font-bold relative">Create an Account</CardTitle>
            <CardDescription className="relative">
              Join our community to access personalized resources
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="name"
                  type="text"
                  className="pl-10"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter any email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="username"
                  type="text"
                  className="pl-10"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Choose a username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="password"
                  type="password"
                  className="pl-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter any password"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="github"
                  checked={formData.isGithubStudent}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isGithubStudent: checked as boolean })
                  }
                />
                <Label htmlFor="github" className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  I am a GitHub Student
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hackclub"
                  checked={formData.isHackClubStudent}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isHackClubStudent: checked as boolean })
                  }
                />
                <Label htmlFor="hackclub" className="flex items-center gap-2">
                  <Code2 className="h-4 w-4" />
                  I am a Hack Club Student
                </Label>
              </div>
            </div>

            <Button type="submit" className="w-full relative overflow-hidden group">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Create Account
                <Sparkles className="h-4 w-4 transition-transform group-hover:scale-125" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="/auth/signin" className="text-primary hover:underline">
                Sign in
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}