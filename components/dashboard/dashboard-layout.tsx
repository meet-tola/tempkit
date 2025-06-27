"use client";

import type React from "react";
import { useState } from "react";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { AppHeader } from "./app-header";
import { PanelLeftClose } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description?: string;
}

interface UserUsage {
  plan: string;
  aiUsage?: number;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  projects?: Project[];
  documents?: any[]; 
  userUsage?: UserUsage;
  onUpgrade?: () => void;
  upgrading?: boolean;
}

export function DashboardLayout({
  children,
  projects = [],
  documents = [],
  userUsage,
  onUpgrade,
  upgrading = false,
}: DashboardLayoutProps) {
  const [activeView, setActiveView] = useState("home");

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex flex-col">
        {/* Header sits inside the provider so its trigger has context */}
        <AppHeader
          userUsage={userUsage}
          onUpgrade={onUpgrade}
          upgrading={upgrading}
        />

        {/* Main area below the fixed header */}
        <div className="flex flex-1 relative">
          {/* Desktop sidebar */}
          <div className="hidden md:flex">
            <AppSidebar
              projects={projects}
               documents={documents}
              activeView={activeView}
              onViewChange={setActiveView}
            />
          </div>

          {/* Absolute trigger */}
          <SidebarTrigger className="hidden md:block absolute top-0 left-64 w-8 h-8 p-0 m-0 bg-transparent border-0 outline-none">
            <PanelLeftClose className="w-4 h-4" />
          </SidebarTrigger>

          {/* Mobile sidebar */}
          <div className="md:hidden">
            <AppSidebar
              projects={projects}
              activeView={activeView}
              onViewChange={setActiveView}
            />
          </div>

          {/* Page content */}
          <SidebarInset className="flex-1 overflow-auto">
            {children}
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
