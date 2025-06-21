"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { prisma } from "@/lib/prisma"
import { signInSchema, signUpSchema } from "@/lib/validations/auth"

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  }

  const validatedFields = signUpSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { data: authData, error } = await supabase.auth.signUp({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    return {
      message: error.message,
    }
  }

  // Create user in database using Prisma
  if (authData.user) {
    try {
      await prisma.user.create({
        data: {
          id: authData.user.id,
          email: validatedFields.data.email,
          name: validatedFields.data.name,
        },
      })

    } catch (error) {
      console.error("Error creating user:", error)
    }
  }

  revalidatePath("/", "layout")
  redirect("/auth/verify-email")
}


export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const validatedFields = signInSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { data: authData, error } = await supabase.auth.signInWithPassword(validatedFields.data)

  if (error) {
    return {
      message: error.message,
    }
  }

  // Check if user has completed onboarding
  if (authData.user) {
    const user = await prisma.user.findUnique({
      where: { id: authData.user.id },
    })

    if (user?.onboardingCompleted) {
      revalidatePath("/", "layout")
      redirect("/dashboard")
    }
  }

  revalidatePath("/", "layout")
  redirect("/onboarding")
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
  redirect("/")
}

export async function signInWithGoogle() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    return {
      message: error.message,
    }
  }

  if (data.url) {
    redirect(data.url)
  }
}
