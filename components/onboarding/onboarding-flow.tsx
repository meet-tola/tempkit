"use client";

import { useOnboardingStore } from "@/lib/hooks/use-onboarding-store";
import { RoleStep } from "./steps/role-step";
import { DocumentTypesStep } from "./steps/document-types-step";

const steps = [
  { id: 1, component: RoleStep },
  { id: 2, component: DocumentTypesStep },
];

export function OnboardingFlow() {
  const { step } = useOnboardingStore();
  const currentStep = steps.find((s) => s.id === step);
  const StepComponent = currentStep?.component || RoleStep;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <StepComponent />
    </div>
  );
}
