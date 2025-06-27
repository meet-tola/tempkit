"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Sparkles,
  Bell,
  Palette,
  ArrowUp,
  User,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import Image from "next/image";
import { ModeToggle } from "../theme-toggle";

interface UserUsage {
  plan: string;
  aiUsage?: number;
}

interface AppHeaderProps {
  userUsage?: UserUsage;
  onUpgrade?: () => void;
  upgrading?: boolean;
}

const themes = [
  { name: "Light", value: "light", icon: Sun },
  { name: "Dark", value: "dark", icon: Moon },
  { name: "System", value: "system", icon: Monitor },
];

export function AppHeader({
  userUsage,
  onUpgrade,
  upgrading = false,
}: AppHeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
      <div className="w-full px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Mobile hamburger menu */}
            <SidebarTrigger className="md:hidden h-8 w-8 p-0" />

            <Image
              src="/tem.png"
              alt="Logo"
              width={100}
              height={100}
              priority
            />
          </div>

          <div className="flex items-center space-x-3">

            <div className="hidden sm:flex items-center space-x-2 text-sm">
              <span className="text-slate-600">Personal</span>
              <Badge variant="secondary" className="text-xs">
                {userUsage?.plan || "Free"}
              </Badge>
            </div>

            {/* Theme Selector */}
            <ModeToggle />

            <Button
              variant="outline"
              className="hidden sm:flex shadow-none"
              onClick={onUpgrade}
              disabled={upgrading || userUsage?.plan === "PRO"}
            >
              <ArrowUp className="w-4 h-4 mr-2" />
              {userUsage?.plan === "PRO" ? "Pro Plan" : "Upgrade Plan"}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 rounded-full p-0"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 text-white" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
