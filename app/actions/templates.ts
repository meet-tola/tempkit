"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "./user"
import { revalidatePath } from "next/cache"
import { generateThumbnail } from "@/lib/thumbnail-generator"

export async function getTemplates(category?: string, includePublic = true) {
  const user = await getCurrentUser()

  const whereClause = {
    AND: [
      {
        OR: [...(user ? [{ userId: user.id }] : []), ...(includePublic ? [{ isPublic: true }] : [])],
      },
      ...(category ? [{ category: category as any }] : []),
    ],
  }

  const templates = await prisma.template.findMany({
    where: whereClause,
    include: {
      user: {
        select: { email: true },
      },
      _count: {
        select: { documents: true },
      },
    },
    orderBy: [{ isPublic: "desc" }, { createdAt: "desc" }],
  })

  return templates
}

export async function getTemplate(templateId: string) {
  const user = await getCurrentUser()

  const template = await prisma.template.findUnique({
    where: { id: templateId },
    include: {
      user: {
        select: { email: true },
      },
    },
  })

  if (!template) {
    throw new Error("Template not found")
  }

  if (!template.isPublic && (!user || template.userId !== user.id)) {
    throw new Error("Access denied")
  }

  return template
}

export async function createTemplate(formData: FormData) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const category = formData.get("category") as string
  const content = formData.get("content") as string
  const isPublic = formData.get("isPublic") === "true"

  try {
    const parsedContent = JSON.parse(content)
    const thumbnail = await generateThumbnail(parsedContent, name)

    const template = await prisma.template.create({
      data: {
        name,
        description,
        category: category as any,
        content: parsedContent,
        thumbnail,
        isPublic,
        userId: user.id,
      },
    })

    revalidatePath("/dashboard/templates")
    return { success: true, template }
  } catch (error) {
    return { error: "Failed to create template" }
  }
}

export async function updateTemplate(templateId: string, formData: FormData) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const content = formData.get("content") as string

  try {
    const parsedContent = JSON.parse(content)
    const thumbnail = await generateThumbnail(parsedContent, name)

    const template = await prisma.template.update({
      where: {
        id: templateId,
        userId: user.id,
      },
      data: {
        name,
        description,
        content: parsedContent,
        thumbnail,
      },
    })

    revalidatePath("/dashboard/templates")
    revalidatePath(`/editor/template/${template.name}`)
    return { success: true, template }
  } catch (error) {
    return { error: "Failed to update template" }
  }
}

export async function duplicateTemplate(templateId: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  try {
    const originalTemplate = await prisma.template.findUnique({
      where: { id: templateId },
    })

    if (!originalTemplate) {
      return { error: "Template not found" }
    }

    if (!originalTemplate.isPublic && originalTemplate.userId !== user.id) {
      return { error: "Access denied" }
    }

    const thumbnail = await generateThumbnail(originalTemplate.content as any, `${originalTemplate.name} (Copy)`)

    const duplicatedTemplate = await prisma.template.create({
      data: {
        name: `${originalTemplate.name} (Copy)`,
        description: originalTemplate.description,
        category: originalTemplate.category,
        content: JSON.stringify(originalTemplate.content),
        thumbnail,
        userId: user.id,
        tags: [...(originalTemplate.tags || []), "duplicated"],
        isPublic: false,
      },
    })

    revalidatePath("/dashboard/templates")
    return { success: true, template: duplicatedTemplate }
  } catch (error) {
    return { error: "Failed to duplicate template" }
  }
}

export async function deleteTemplate(templateId: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  try {
    await prisma.template.delete({
      where: {
        id: templateId,
        userId: user.id,
      },
    })

    revalidatePath("/dashboard/templates")
    return { success: true }
  } catch (error) {
    return { error: "Failed to delete template" }
  }
}
