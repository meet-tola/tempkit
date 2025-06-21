"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "./user"
import { revalidatePath } from "next/cache"

export async function getDocuments(projectId?: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const documents = await prisma.document.findMany({
    where: {
      userId: user.id,
      ...(projectId && { projectId }),
    },
    include: {
      template: {
        select: { name: true, category: true },
      },
      project: {
        select: { name: true, clientName: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  })

  return documents
}

export async function getDocument(documentId: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const document = await prisma.document.findUnique({
    where: {
      id: documentId,
      userId: user.id,
    },
    include: {
      template: true,
      project: true,
    },
  })

  return document
}

export async function createDocument(formData: FormData) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const title = formData.get("title") as string
  const templateId = formData.get("templateId") as string
  const projectId = formData.get("projectId") as string
  const content = formData.get("content") as string

  try {
    let documentContent = { type: "doc", content: [] }

    // If creating from template, use template content
    if (templateId) {
      const template = await prisma.template.findUnique({
        where: { id: templateId },
      })
      if (template) {
        documentContent = template.content as any
      }
    } else if (content) {
      documentContent = JSON.parse(content)
    }

    const document = await prisma.document.create({
      data: {
        title,
        content: documentContent,
        userId: user.id,
        templateId: templateId || null,
        projectId: projectId || null,
      },
    })

    revalidatePath("/dashboard/documents")
    return { success: true, document }
  } catch (error) {
    return { error: "Failed to create document" }
  }
}

export async function updateDocument(documentId: string, formData: FormData) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const status = formData.get("status") as string

  try {
    const document = await prisma.document.update({
      where: {
        id: documentId,
        userId: user.id,
      },
      data: {
        title,
        content: JSON.parse(content),
        ...(status && { status: status as any }),
        updatedAt: new Date(),
      },
    })

    revalidatePath("/dashboard/documents")
    revalidatePath(`/document-editor/${documentId}`)
    return { success: true, document }
  } catch (error) {
    return { error: "Failed to update document" }
  }
}

export async function deleteDocument(documentId: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  try {
    await prisma.document.delete({
      where: {
        id: documentId,
        userId: user.id,
      },
    })

    revalidatePath("/dashboard/documents")
    return { success: true }
  } catch (error) {
    return { error: "Failed to delete document" }
  }
}

export async function duplicateDocument(documentId: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  try {
    const originalDocument = await prisma.document.findUnique({
      where: {
        id: documentId,
        userId: user.id,
      },
    })

    if (!originalDocument) {
      return { error: "Document not found" }
    }

    const duplicatedDocument = await prisma.document.create({
      data: {
        title: `${originalDocument.title} (Copy)`,
        content: JSON.parse(JSON.stringify(originalDocument.content)),
        userId: user.id,
        templateId: originalDocument.templateId,
        projectId: originalDocument.projectId,
      },
    })

    revalidatePath("/dashboard/documents")
    return { success: true, document: duplicatedDocument }
  } catch (error) {
    return { error: "Failed to duplicate document" }
  }
}

export async function updateDocumentStatus(documentId: string, status: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  try {
    const document = await prisma.document.update({
      where: {
        id: documentId,
        userId: user.id,
      },
      data: {
        status: status as any,
        updatedAt: new Date(),
      },
    })

    revalidatePath("/dashboard/documents")
    return { success: true, document }
  } catch (error) {
    return { error: "Failed to update document status" }
  }
}
