"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Eye, Copy, Edit, FileText, DollarSign, Shield, Briefcase, Star, Users } from "lucide-react"
import Link from "next/link"
import { getTemplates, duplicateTemplate } from "@/app/actions/templates"
import { useRouter } from "next/navigation"

const categoryIcons = {
  PROPOSAL: Briefcase,
  CONTRACT: FileText,
  INVOICE: DollarSign,
  NDA: Shield,
  BRIEF: FileText,
  LEGAL: Shield,
}

const categoryColors = {
  PROPOSAL: "bg-blue-100 text-blue-700",
  CONTRACT: "bg-emerald-100 text-emerald-700",
  INVOICE: "bg-violet-100 text-violet-700",
  NDA: "bg-orange-100 text-orange-700",
  BRIEF: "bg-indigo-100 text-indigo-700",
  LEGAL: "bg-red-100 text-red-700",
}

export default function TemplatesPage() {
  const router = useRouter()
  const [templates, setTemplates] = useState<any[]>([])
  const [filteredTemplates, setFilteredTemplates] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTemplates()
  }, [])

  useEffect(() => {
    filterTemplates()
  }, [templates, selectedCategory, searchQuery])

  const loadTemplates = async () => {
    try {
      const data = await getTemplates()
      setTemplates(data)
    } catch (error) {
      console.error("Failed to load templates:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterTemplates = () => {
    let filtered = templates

    if (selectedCategory) {
      filtered = filtered.filter((template) => template.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (template) =>
          template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    setFilteredTemplates(filtered)
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

  const categories = Array.from(new Set(templates.map((t) => t.category)))

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-8"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-slate-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Template Library</h1>
            <p className="text-slate-600">Professional templates ready to customize</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-slate-300 focus:border-violet-500 focus:ring-violet-500"
            />
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === "" ? "default" : "outline"}
              onClick={() => setSelectedCategory("")}
              className={selectedCategory === "" ? "bg-gradient-to-r from-violet-600 to-indigo-600" : ""}
            >
              All Templates
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap ${
                  selectedCategory === category ? "bg-gradient-to-r from-violet-600 to-indigo-600" : ""
                }`}
              >
                {category.charAt(0) + category.slice(1).toLowerCase()}
              </Button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => {
            const IconComponent = categoryIcons[template.category as keyof typeof categoryIcons] || FileText
            const colorClass =
              categoryColors[template.category as keyof typeof categoryColors] || "bg-slate-100 text-slate-700"

            return (
              <Card key={template.id} className="group hover:shadow-lg transition-all duration-300 border-slate-200">
                <CardContent className="p-0">
                  {/* Template Preview */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 rounded-t-lg overflow-hidden relative">
                    {template.thumbnail ? (
                      <img
                        src={template.thumbnail || "/placeholder.svg"}
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-6">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${colorClass}`}
                          >
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div className="space-y-2">
                            <div className="h-2 bg-slate-300 rounded w-3/4 mx-auto"></div>
                            <div className="h-2 bg-slate-300 rounded w-1/2 mx-auto"></div>
                            <div className="h-2 bg-slate-300 rounded w-2/3 mx-auto"></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Overlay with actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex space-x-2">
                        <Link href={`/template-preview/${template.id}`}>
                          <Button size="sm" variant="secondary">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                        </Link>
                        <Button size="sm" variant="secondary" onClick={() => handleUseTemplate(template)}>
                          <Copy className="w-4 h-4 mr-2" />
                          Use Template
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-slate-900 group-hover:text-violet-600 transition-colors line-clamp-2">
                        {template.name}
                      </h3>
                      <Badge className={`ml-2 ${colorClass} border-0`}>{template.category.toLowerCase()}</Badge>
                    </div>

                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">{template.description}</p>

                    {/* Tags */}
                    {template.tags && template.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {template.tags.slice(0, 3).map((tag: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                            {tag}
                          </Badge>
                        ))}
                        {template.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                            +{template.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {template._count?.documents || 0} uses
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500" />
                          {template.isPublic ? "Public" : "Private"}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Link href={`/template-preview/${template.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                        onClick={() => handleUseTemplate(template)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Use Template
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No templates found</h3>
            <p className="text-slate-600 mb-6">
              {searchQuery || selectedCategory
                ? "Try adjusting your search or filters"
                : "No templates available at the moment"}
            </p>
            {(searchQuery || selectedCategory) && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("")
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
