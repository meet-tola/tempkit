import { createClient } from "@/utils/supabase/server"
import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/onboarding"

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // Create or update user for OAuth users
      try {
        await prisma.user.upsert({
          where: { id: data.user.id },
          update: {
            email: data.user.email!,
            name: data.user.user_metadata?.name || null,
            avatarUrl: data.user.user_metadata?.avatar_url || null,
          },
          create: {
            id: data.user.id,
            email: data.user.email!,
            name: data.user.user_metadata?.name || null,
            avatarUrl: data.user.user_metadata?.avatar_url || null,
          },
        })



        // Check if user has completed onboarding
        const user = await prisma.user.findUnique({
          where: { id: data.user.id },
        })

        if (user?.onboardingCompleted) {
          return NextResponse.redirect(`${origin}/dashboard`)
        }
      } catch (error) {
        console.error("Error handling OAuth callback:", error)
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
