import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"

export default async function OnboardingPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check if user has already completed onboarding
  if (user.user_metadata?.onboarding_completed) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <OnboardingFlow />
    </div>
  )
}
