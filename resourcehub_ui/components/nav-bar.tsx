"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { usePathname } from 'next/navigation';
import { Home, Search, PenTool, Gift, LogIn, UserPlus } from 'lucide-react';

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-lg">
              ResourceHub
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className={`flex items-center space-x-2 ${
                pathname === '/' ? 'text-primary' : 'text-foreground/60'
              } transition-colors hover:text-primary`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/chat"
              className={`flex items-center space-x-2 ${
                pathname === '/chat' ? 'text-primary' : 'text-foreground/60'
              } transition-colors hover:text-primary`}
            >
              <PenTool className="h-4 w-4" />
              <span>Plan Project</span>
            </Link>
            <Link
              href="/search"
              className={`flex items-center space-x-2 ${
                pathname.startsWith('/search') ? 'text-primary' : 'text-foreground/60'
              } transition-colors hover:text-primary`}
            >
              <Gift className="h-4 w-4" />
              <span>Resources</span>
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/auth/signin">
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button size="sm" className="flex items-center space-x-2">
              <UserPlus className="h-4 w-4" />
              <span>Sign Up</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}