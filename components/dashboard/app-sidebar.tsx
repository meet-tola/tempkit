"use client";

import { Home, FileText, Clock, FolderOpen } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface Project {
  id: string;
  name: string;
  description?: string;
}

interface AppSidebarProps {
  projects: Project[];
  documents?: any[]; 
  activeView: string;
  onViewChange: (view: string) => void;
}

export function AppSidebar({
  projects,
  documents,
  activeView,
  onViewChange,
}: AppSidebarProps) {

  console.log("Documents in sidebar:", documents);  
  return (
    <Sidebar
      collapsible="icon"
      className="border-none mt-[60px]"
    >
      <SidebarContent className="p-3 pt-6  border-r border-slate-200">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeView === "home"}
                  onClick={() => onViewChange("home")}
                  className="w-full justify-start text-sm font-medium"
                  tooltip="Home"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeView === "templates"}
                  onClick={() => onViewChange("templates")}
                  className="w-full justify-start text-sm font-medium"
                  tooltip="Templates"
                >
                  <FileText className="w-4 h-4" />
                  <span>Templates</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeView === "recent"}
                  onClick={() => onViewChange("recent")}
                  className="w-full justify-start text-sm font-medium"
                  tooltip="Recent"
                >
                  <Clock className="w-4 h-4" />
                  <span>Recent</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Add recent documents section */}
        {documents && documents.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-medium text-slate-500 px-2 py-1">
              Recent Documents
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {documents.slice(0, 5).map((doc) => (
                  <SidebarMenuItem key={doc.id}>
                    <SidebarMenuButton
                      isActive={activeView === `doc-${doc.id}`}
                      onClick={() => {
                        onViewChange(`doc-${doc.id}`);
                        // Optionally navigate to the editor
                        // router.push(`/editor?document=${doc.id}`);
                      }}
                      className="w-full justify-start text-sm"
                      tooltip={doc.name}
                    >
                      <FileText className="w-4 h-4" />
                      <span className="truncate">{doc.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {projects.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-medium text-slate-500 px-2 py-1">
              Projects
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {projects.slice(0, 5).map((project) => (
                  <SidebarMenuItem key={project.id}>
                    <SidebarMenuButton
                      isActive={activeView === `project-${project.id}`}
                      onClick={() => onViewChange(`project-${project.id}`)}
                      className="w-full justify-start text-sm"
                      tooltip={project.name}
                    >
                      <FolderOpen className="w-4 h-4" />
                      <span className="truncate">{project.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
