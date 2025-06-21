"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Paperclip, Star, Heart, FileText } from "lucide-react"
import { getTemplates, duplicateTemplate } from "@/app/actions/templates"
import { getProjects } from "@/app/actions/projects"
import { getDocuments } from "@/app/actions/documents"
import { upgradeUserPlan, getUserUsage, trackAiUsage } from "@/app/actions/billing"

const categoryIcons = {
  PROPOSAL: FileText,
  CONTRACT: FileText,
  INVOICE: FileText,
  NDA: FileText,
  BRIEF: FileText,
  LEGAL: FileText,
}

function TemplateCard({ template, onUse }: { template: any; onUse: () => void }) {
  return (
    <div
      onClick={onUse}
      className="rounded-full overflow-hidden bg-white shadow-sm cursor-pointer max-w-3xl w-full flex items-center space-x-4 p-4"
    >
      <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
        <img
          src={template.thumbnail || "/placeholder.svg"}
          alt={template.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">{template.name}</h3>
        <div className="flex flex-wrap gap-2">
          {template.tags?.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}


function TemplateCardSkeleton() {
  return (
    <Card className="border-slate-200 overflow-hidden">
      <div className="aspect-[4/3] bg-slate-200 animate-pulse relative">
        <div className="absolute top-3 left-3 w-20 h-4 bg-white/50 rounded-full"></div>
        <div className="absolute top-3 right-3 w-8 h-4 bg-white/50 rounded-full"></div>
      </div>
      <CardContent className="p-4">
        <div className="h-5 bg-slate-200 rounded animate-pulse mb-2"></div>
        <div className="flex space-x-1.5">
          <div className="h-5 w-16 bg-slate-200 rounded animate-pulse"></div>
          <div className="h-5 w-12 bg-slate-200 rounded animate-pulse"></div>
          <div className="h-5 w-14 bg-slate-200 rounded animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const [templates, setTemplates] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [documents, setDocuments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [aiPrompt, setAiPrompt] = useState("")
  const [aiDocumentType, setAiDocumentType] = useState("")
  const [userUsage, setUserUsage] = useState<any>(null)
  const [upgrading, setUpgrading] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [templatesData, projectsData, documentsData, usageData] = await Promise.all([
        getTemplates(),
        getProjects(),
        getDocuments(),
        getUserUsage(),
      ])

      setTemplates(templatesData || [])
      setProjects(projectsData || [])
      setDocuments(documentsData || [])
      setUserUsage(usageData || { aiUsage: 0, plan: "FREE" })
    } catch (error) {
      console.error("Failed to load data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUseTemplate = async (template: any) => {
    try {
      const result = await duplicateTemplate(template.id)
      if (result.success) {
        router.push(`/editor?document=${result.template.id}`)
      } else {
        alert(result.error || "Failed to use template")
      }
    } catch (error) {
      alert("Failed to use template")
    }
  }

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim() || !aiDocumentType) return

    // Check usage limits for free users
    if (userUsage?.plan === "FREE" && userUsage?.aiUsage >= 5) {
      alert("You've reached your AI generation limit. Upgrade to Pro for unlimited access!")
      return
    }

    try {
      // Track AI usage
      await trackAiUsage()

      const params = new URLSearchParams({
        ai: aiPrompt,
        type: aiDocumentType,
      })

      router.push(`/editor?${params.toString()}`)
    } catch (error) {
      alert("Failed to generate document")
    }
  }

  const handleUpgrade = async () => {
    setUpgrading(true)
    try {
      const result = await upgradeUserPlan()
      if (result.success) {
        alert("Successfully upgraded to Pro!")
        loadData() // Reload to update usage data
      } else {
        alert(result.error || "Failed to upgrade plan")
      }
    } catch (error) {
      alert("Failed to upgrade plan")
    } finally {
      setUpgrading(false)
    }
  }

  const canUseAi = userUsage?.plan === "PRO" || (userUsage?.aiUsage || 0) < 5

  return (
    <DashboardLayout projects={projects} userUsage={userUsage} onUpgrade={handleUpgrade} upgrading={upgrading}>
      <div className="flex-1 flex flex-col">
        {/* AI Prompt Section */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold text-slate-900 mb-4">What can I help you create?</h1>
              <p className="text-slate-600">Describe your document needs and I'll generate it for you.</p>
              {userUsage?.plan === "FREE" && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>{5 - (userUsage?.aiUsage || 0)}</strong> AI generations remaining on free plan
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Textarea
                  placeholder={
                    canUseAi
                      ? "Create a photography contract for wedding shoots with usage rights, payment terms, and delivery timeline..."
                      : "Upgrade to Pro to continue using AI generation"
                  }
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  disabled={!canUseAi}
                  className="min-h-32 pr-24 border-slate-300 focus:border-violet-500 focus:ring-violet-500 resize-none"
                />
                <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={!canUseAi}>
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleAiGenerate}
                    disabled={!aiPrompt.trim() || !aiDocumentType || !canUseAi}
                    className="h-8 bg-slate-900 hover:bg-slate-800"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Select value={aiDocumentType} onValueChange={setAiDocumentType} disabled={!canUseAi}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PROPOSAL">Proposal</SelectItem>
                    <SelectItem value="CONTRACT">Contract</SelectItem>
                    <SelectItem value="INVOICE">Invoice</SelectItem>
                    <SelectItem value="BRIEF">Project Brief</SelectItem>
                    <SelectItem value="NDA">NDA</SelectItem>
                    <SelectItem value="LEGAL">Legal Document</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => router.push("/editor")}>
                  Start from scratch
                </Button>
              </div>

              {!canUseAi && (
                <div className="text-center pt-4">
                  <Button onClick={handleUpgrade} disabled={upgrading} className="bg-violet-600 hover:bg-violet-700">
                    {upgrading ? "Upgrading..." : "Upgrade to Pro"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Templates Section */}
        <div className="border-t border-slate-200 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-slate-900">Quick Start Templates</h2>
              <Button variant="ghost" onClick={() => router.push("/templates")} className="text-sm">
                View all templates
              </Button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <TemplateCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {templates.slice(0, 8).map((template) => (
                  <TemplateCard key={template.id} template={template} onUse={() => handleUseTemplate(template)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
