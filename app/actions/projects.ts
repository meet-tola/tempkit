"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "./user"
import { revalidatePath } from "next/cache"

export async function getProjects() {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const projects = await prisma.project.findMany({
    where: { userId: user.id },
    include: {
      _count: {
        select: { documents: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  })

  return projects
}

export async function getProject(projectId: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
      userId: user.id,
    },
    include: {
      documents: {
        include: {
          template: {
            select: { name: true, category: true },
          },
        },
        orderBy: { updatedAt: "desc" },
      },
    },
  })

  return project
}

export async function createProject(formData: FormData) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const clientName = formData.get("clientName") as string

  try {
    const project = await prisma.project.create({
      data: {
        name,
        description,
        clientName,
        userId: user.id,
      },
    })

    revalidatePath("/dashboard/projects")
    return { success: true, project }
  } catch (error) {
    return { error: "Failed to create project" }
  }
}

export async function updateProject(projectId: string, formData: FormData) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const clientName = formData.get("clientName") as string
  const status = formData.get("status") as string

  try {
    const project = await prisma.project.update({
      where: {
        id: projectId,
        userId: user.id,
      },
      data: {
        name,
        description,
        clientName,
        ...(status && { status: status as any }),
      },
    })

    revalidatePath("/dashboard/projects")
    revalidatePath(`/dashboard/projects/${projectId}`)
    return { success: true, project }
  } catch (error) {
    return { error: "Failed to update project" }
  }
}

export async function deleteProject(projectId: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  try {
    await prisma.project.delete({
      where: {
        id: projectId,
        userId: user.id,
      },
    })

    revalidatePath("/dashboard/projects")
    return { success: true }
  } catch (error) {
    return { error: "Failed to delete project" }
  }
}
