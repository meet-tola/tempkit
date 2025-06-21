"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "./user"
import { revalidatePath } from "next/cache"

export async function getUserUsage() {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  try {
    // Get user with usage data
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        role: true,
        plan: true,
        aiUsage: true,
        planExpiresAt: true,
      },
    })

    if (!userData) {
      throw new Error("User not found")
    }

    return {
      plan: userData.plan || "FREE",
      aiUsage: userData.aiUsage || 0,
      planExpiresAt: userData.planExpiresAt,
    }
  } catch (error) {
    console.error("Failed to get user usage:", error)
    return { plan: "FREE", aiUsage: 0, planExpiresAt: null }
  }
}

export async function trackAiUsage() {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  try {
    // Increment AI usage count
    await prisma.user.update({
      where: { id: user.id },
      data: {
        aiUsage: {
          increment: 1,
        },
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Failed to track AI usage:", error)
    return { error: "Failed to track usage" }
  }
}

export async function upgradeUserPlan() {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  try {
    // In a real app, this would integrate with Stripe or another payment processor
    // For now, we'll simulate the upgrade
    const expiresAt = new Date()
    expiresAt.setFullYear(expiresAt.getFullYear() + 1) // 1 year from now

    await prisma.user.update({
      where: { id: user.id },
      data: {
        plan: "PRO",
        planExpiresAt: expiresAt,
        aiUsage: 0, // Reset usage count
      },
    })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Failed to upgrade user plan:", error)
    return { error: "Failed to upgrade plan" }
  }
}

export async function cancelUserPlan() {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        plan: "FREE",
        planExpiresAt: null,
        aiUsage: 0, // Reset usage count
      },
    })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Failed to cancel user plan:", error)
    return { error: "Failed to cancel plan" }
  }
}

export async function getSubscriptionStatus() {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  try {
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        plan: true,
        planExpiresAt: true,
        aiUsage: true,
      },
    })

    if (!userData) {
      return { plan: "FREE", isActive: false, aiUsage: 0 }
    }

    const isActive = userData.plan === "PRO" && userData.planExpiresAt && new Date(userData.planExpiresAt) > new Date()

    return {
      plan: userData.plan || "FREE",
      isActive,
      aiUsage: userData.aiUsage || 0,
      expiresAt: userData.planExpiresAt,
    }
  } catch (error) {
    console.error("Failed to get subscription status:", error)
    return { plan: "FREE", isActive: false, aiUsage: 0 }
  }
}
