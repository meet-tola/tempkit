"use server"

import { generateStructuredContent } from "@/lib/ai/gemini"
import { getCurrentUser } from "./user"
import { prisma } from "@/lib/prisma"
import { generateThumbnail } from "@/lib/thumbnail-generator"
import { revalidatePath } from "next/cache"

export async function generateDocumentWithAI(prompt: string, documentType: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  try {
    // Generate content with Gemini
    const aiResponse = await generateStructuredContent(
      `Create a professional ${documentType} document for: ${prompt}`,
      {},
    )

    // Generate thumbnail
    const thumbnail = await generateThumbnail(aiResponse.content, aiResponse.title)

    // Create document in database
    const document = await prisma.document.create({
      data: {
        title: aiResponse.title,
        content: aiResponse.content,
        thumbnail,
        userId: user.id,
        metadata: {
          generatedWith: "gemini",
          originalPrompt: prompt,
          documentType,
        },
      },
    })

    revalidatePath("/dashboard/documents")
    return { success: true, document }
  } catch (error) {
    console.error("AI Generation Error:", error)
    return { error: "Failed to generate document with AI" }
  }
}

export async function generateTemplateWithAI(prompt: string, category: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  try {
    const aiResponse = await generateStructuredContent(`Create a ${category} template for: ${prompt}`, {})

    const thumbnail = await generateThumbnail(aiResponse.content, aiResponse.title)

    const template = await prisma.template.create({
      data: {
        name: aiResponse.title,
        description: `AI Generated: ${prompt.substring(0, 100)}...`,
        category: aiResponse.category as any,
        content: aiResponse.content,
        thumbnail,
        userId: user.id,
        tags: ["ai-generated"],
      },
    })

    revalidatePath("/dashboard/templates")
    return { success: true, template }
  } catch (error) {
    console.error("AI Generation Error:", error)
    return { error: "Failed to generate template with AI" }
  }
}

export async function improveDocumentWithAI(documentId: string, instructions: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  try {
    const document = await prisma.document.findUnique({
      where: {
        id: documentId,
        userId: user.id,
      },
    })

    if (!document) {
      return { error: "Document not found" }
    }

    // Extract current content as text
    const currentText = extractTextFromTiptap(document.content as any)

    const improvedResponse = await generateStructuredContent(
      `Current document content: ${currentText}\n\nImprovement instructions: ${instructions}\n\nPlease improve the document based on these instructions.`,
      {},
    )

    // Generate new thumbnail
    const thumbnail = await generateThumbnail(improvedResponse.content, document.title)

    // Update document
    const updatedDocument = await prisma.document.update({
      where: { id: documentId },
      data: {
        content: improvedResponse.content,
        thumbnail,
        updatedAt: new Date(),
      },
    })

    revalidatePath(`/editor/${documentId}`)
    return { success: true, document: updatedDocument }
  } catch (error) {
    console.error("AI Improvement Error:", error)
    return { error: "Failed to improve document with AI" }
  }
}

// Helper function to extract text from Tiptap JSON
function extractTextFromTiptap(content: any): string {
  if (!content || !content.content) return ""

  let text = ""

  function extractFromNode(node: any): void {
    if (node.type === "text") {
      text += node.text || ""
    } else if (node.content) {
      node.content.forEach(extractFromNode)
    }

    if (node.type === "paragraph" || node.type === "heading") {
      text += "\n\n"
    }
  }

  content.content.forEach(extractFromNode)
  return text.trim()
}
