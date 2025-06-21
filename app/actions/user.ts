"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/server"
import { prisma } from "@/lib/prisma"
import { userUpdateSchema } from "@/lib/validations/auth"

export async function updateUser(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      message: "Unauthorized",
    }
  }

  const data = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    role: formData.get("role") as string,
    roleOther: formData.get("roleOther") as string,
    documentTypes: formData.getAll("documentTypes") as string[],
  }

  const validatedFields = userUpdateSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        firstName: validatedFields.data.firstName,
        lastName: validatedFields.data.lastName,
        role: validatedFields.data.role,
        roleOther: validatedFields.data.roleOther || null,
        documentTypes: validatedFields.data.documentTypes,
      },
    })

    revalidatePath("/dashboard")
    revalidatePath("/profile")

    return {
      success: true,
      message: "Profile updated successfully",
    }
  } catch (error) {
    console.error("Error updating user:", error)
    return {
      message: "An error occurred while updating your profile. Please try again.",
    }
  }
}

export async function getCurrentUser() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }
  return user
}