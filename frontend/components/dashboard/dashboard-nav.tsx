"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { 
  Headphones, 
  LayoutDashboard, 
  FileAudio, 
  Search, 
  Settings, 
  LogOut 
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
  },
  {
    title: "Meetings",
    href: "/dashboard/meetings",
    icon: <FileAudio className="mr-2 h-4 w-4" />,
  },
  {
    title: "Search",
    href: "/dashboard/search",
    icon: <Search className="mr-2 h-4 w-4" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return ( 
        <div className="flex h-full flex-col p-4">
      <div className="flex h-14 items-center border-b px-4 py-2">
        <Link href="/dashboard" className="flex items-center">
          <Headphones className="mr-2 h-6 w-6 text-primary" />
          <span className="font-bold">Memora</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-6">
        <nav className="grid items-start gap-2">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "transparent"
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t pt-4">
        <div className="flex items-center justify-between">
          <UserButton afterSignOutUrl="/" />
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div> 
  );
}