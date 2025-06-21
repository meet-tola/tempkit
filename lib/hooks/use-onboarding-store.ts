"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface OnboardingState {
  step: number
  data: {
    role: string
    roleOther: string
    documentTypes: string[]
  }
  setStep: (step: number) => void
  updateData: (data: Partial<OnboardingState["data"]>) => void
  resetOnboarding: () => void
}

const initialData = {
  role: "",
  roleOther: "",
  documentTypes: [],
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      step: 1,
      data: initialData,
      setStep: (step) => set({ step }),
      updateData: (newData) =>
        set((state) => ({
          data: { ...state.data, ...newData },
        })),
      resetOnboarding: () => set({ step: 1, data: initialData }),
    }),
    {
      name: "onboarding-storage",
    },
  ),
)
