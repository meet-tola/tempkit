"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Download, Share2, Eye, Palette, Sparkles, Loader2 } from "lucide-react"
import Link from "next/link"
import { TiptapEditor } from "@/components/tiptap-editor"
import { generateDocumentWithAI, improveDocumentWithAI } from "@/app/actions/ai"
import { createDocument, updateDocument, getDocument } from "@/app/actions/documents"
import { getTemplates } from "@/app/actions/templates"

const colorThemes = [
  { name: "Violet", primary: "bg-violet-600", secondary: "bg-violet-100", text: "text-violet-600" },
  { name: "Blue", primary: "bg-blue-600", secondary: "bg-blue-100", text: "text-blue-600" },
  { name: "Emerald", primary: "bg-emerald-600", secondary: "bg-emerald-100", text: "text-emerald-600" },
  { name: "Orange", primary: "bg-orange-600", secondary: "bg-orange-100", text: "text-orange-600" },
  { name: "Slate", primary: "bg-slate-600", secondary: "bg-slate-100", text: "text-slate-600" },
]

export default function EditorPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const documentId = searchParams.get("document")
  const templateName = searchParams.get("template")
  const aiPrompt = searchParams.get("ai")
  const aiType = searchParams.get("type")

  const [document, setDocument] = useState<any>(null)
  const [content, setContent] = useState<any>({ type: "doc", content: [] })
  const [title, setTitle] = useState("")
  const [selectedTheme, setSelectedTheme] = useState(colorThemes[0])
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [aiGenerating, setAiGenerating] = useState(false)
  const [aiInstructions, setAiInstructions] = useState("")

  useEffect(() => {
    loadEditor()
  }, [documentId, templateName, aiPrompt])

  const loadEditor = async () => {
    setLoading(true)

    try {
      if (aiPrompt && aiType) {
        // AI Generation mode
        setAiGenerating(true)
        setTitle("AI Generated Document")

        const result = await generateDocumentWithAI(aiPrompt, aiType)

        if (result.success) {
          setDocument(result.document)
          setTitle(result.document.title)
          setContent(result.document.content)

          // Update URL to document editor
          const newUrl = `/editor?document=${result.document.id}`
          window.history.replaceState({}, "", newUrl)
        } else {
          alert(result.error || "Failed to generate document")
          router.push("/dashboard")
          return
        }

        setAiGenerating(false)
      } else if (documentId) {
        // Edit existing document
        const doc = await getDocument(documentId)
        if (doc) {
          setDocument(doc)
          setTitle(doc.title)
          setContent(doc.content)
        } else {
          alert("Document not found")
          router.push("/dashboard")
          return
        }
      } else if (templateName) {
        // Create from template
        const templates = await getTemplates()
        const template = templates.find((t) => t.name.toLowerCase().replace(/\s+/g, "-") === templateName)

        if (template) {
          setTitle(`New ${template.name}`)
          setContent(template.content)
          setDocument(null) // Make sure this is null for new documents
        } else {
          alert("Template not found")
          router.push("/dashboard")
          return
        }
      } else {
        // New blank document
        setTitle("Untitled Document")
        setContent({
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Start writing your document here..." }],
            },
          ],
        })
        setDocument(null)
      }
    } catch (error) {
      console.error("Failed to load editor:", error)
      alert("Failed to load editor")
      router.push("/dashboard")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("content", JSON.stringify(content))

      let result
      if (document?.id) {
        result = await updateDocument(document.id, formData)
      } else {
        result = await createDocument(formData)
      }

      if (result.success) {
        setDocument(result.document)
        if (!document?.id) {
          // Update URL for new document without causing a redirect
          const newUrl = `/editor?document=${result.document.id}`
          window.history.replaceState({}, "", newUrl)
        }
        // Show success message
        console.log("Document saved successfully")
      } else {
        alert(result.error || "Failed to save document")
      }
    } catch (error) {
      console.error("Save error:", error)
      alert("Failed to save document")
    } finally {
      setSaving(false)
    }
  }

  const handleAiImprove = async () => {
    if (!document?.id || !aiInstructions.trim()) return

    setAiGenerating(true)

    try {
      const result = await improveDocumentWithAI(document.id, aiInstructions)

      if (result.success) {
        setContent(result.document.content)
        setAiInstructions("")
      } else {
        alert(result.error || "Failed to improve document")
      }
    } catch (error) {
      alert("Failed to improve document")
    } finally {
      setAiGenerating(false)
    }
  }

  if (loading || aiGenerating) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-6 w-6 bg-slate-200 rounded animate-pulse"></div>
                <div>
                  <div className="h-5 w-48 bg-slate-200 rounded animate-pulse mb-1"></div>
                  <div className="h-3 w-24 bg-slate-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-8 w-16 bg-slate-200 rounded animate-pulse"></div>
                <div className="h-8 w-20 bg-slate-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-6">
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-slate-200">
                <CardContent className="p-4">
                  <div className="h-4 w-24 bg-slate-200 rounded animate-pulse mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-8 w-full bg-slate-200 rounded animate-pulse"></div>
                    <div className="h-8 w-full bg-slate-200 rounded animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card className="border-slate-200 min-h-[800px]">
                <CardContent className="p-8">
                  {aiGenerating ? (
                    <div className="flex flex-col items-center justify-center h-96">
                      <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full flex items-center justify-center mb-6">
                        <Sparkles className="w-8 h-8 text-white animate-pulse" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">AI is generating your document...</h3>
                      <p className="text-slate-600 mb-6 text-center max-w-md">
                        Please wait while we create a professional document based on your requirements.
                      </p>
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm text-slate-500">This may take a few moments</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="h-8 w-3/4 bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-4 w-full bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-4 w-5/6 bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-4 w-4/5 bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-4 w-full bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg font-semibold border-none p-0 h-auto focus:ring-0 bg-transparent"
                />
                <p className="text-sm text-slate-500">{document?.id ? "Document Editor" : "New Document"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={() => setIsPreviewMode(!isPreviewMode)}>
                <Eye className="w-4 h-4 mr-2" />
                {isPreviewMode ? "Edit" : "Preview"}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={saving}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Tools */}
          {!isPreviewMode && (
            <div className="lg:col-span-1 space-y-6">
              {/* AI Assistant */}
              <Card className="border-slate-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Assistant
                  </h3>
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Ask AI to improve your document..."
                      value={aiInstructions}
                      onChange={(e) => setAiInstructions(e.target.value)}
                      className="text-sm"
                      rows={3}
                    />
                    <Button
                      size="sm"
                      onClick={handleAiImprove}
                      disabled={!aiInstructions.trim() || aiGenerating}
                      className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                    >
                      {aiGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Improving...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Improve with AI
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Theme Colors */}
              <Card className="border-slate-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
                    <Palette className="w-4 h-4 mr-2" />
                    Color Theme
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {colorThemes.map((theme) => (
                      <button
                        key={theme.name}
                        onClick={() => setSelectedTheme(theme)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedTheme.name === theme.name
                            ? "border-slate-400 bg-slate-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <div className={`w-4 h-4 rounded-full ${theme.primary}`}></div>
                          <span className="text-sm font-medium">{theme.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main Editor */}
          <div className={`${isPreviewMode ? "lg:col-span-4" : "lg:col-span-3"}`}>
            <Card className="border-slate-200 min-h-[800px]">
              <CardContent className="p-8">
                <TiptapEditor content={content} onChange={setContent} editable={!isPreviewMode} theme={selectedTheme} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
  