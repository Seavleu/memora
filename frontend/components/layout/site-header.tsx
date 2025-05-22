"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { 
  Headphones, 
  Menu, 
  X,
  Mic,
  FileText,
  Search
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserServerButton } from "@/components/server/user-server-button";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${
      isScrolled ? "bg-background/90 backdrop-blur-md border-b" : "bg-transparent"
    }`}>
      <div className="container flex h-16 items-center justify-between mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Headphones className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Memora</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href="/features" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/features" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Features
          </Link>
          <Link 
            href="/pricing" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/pricing" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Pricing
          </Link>
          <Link 
            href="/about" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/about" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            About
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <UserServerButton />
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 flex flex-col gap-4">
            <Link 
              href="/features" 
              className="flex items-center py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>Features</span>
            </Link>
            <Link 
              href="/pricing" 
              className="flex items-center py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Mic className="mr-2 h-4 w-4" />
              <span>Pricing</span>
            </Link>
            <Link 
              href="/about" 
              className="flex items-center py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Search className="mr-2 h-4 w-4" />
              <span>About</span>
            </Link>
            
            <div className="flex flex-col gap-2 pt-2 border-t">
              <UserServerButton />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}