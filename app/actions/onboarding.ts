"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { prisma } from "@/lib/prisma"
import { onboardingSchema } from "@/lib/validations/auth"

export async function completeOnboarding(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const data = {
    role: formData.get("role") as string,
    roleOther: formData.get("roleOther") as string,
    documentTypes: formData.getAll("documentTypes") as string[],
  }

  const validatedFields = onboardingSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    // Update user using Prisma
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        role: validatedFields.data.role,
        roleOther: validatedFields.data.roleOther || null,
        documentTypes: validatedFields.data.documentTypes,
        onboardingCompleted: true,
      },
      create: {
        id: user.id,
        email: user.email!,
        role: validatedFields.data.role,
        roleOther: validatedFields.data.roleOther || null,
        documentTypes: validatedFields.data.documentTypes,
        onboardingCompleted: true,
      },
    })

    revalidatePath("/", "layout")
    redirect("/dashboard")
  } catch (error) {
    console.error("Error completing onboarding:", error)
    return {
      message: "An error occurred while completing onboarding. Please try again.",
    }
  }
}
