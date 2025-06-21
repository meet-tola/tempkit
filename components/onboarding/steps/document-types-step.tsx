"use client";

import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/lib/hooks/use-onboarding-store";
import { completeOnboarding } from "@/app/actions/onboarding";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  FileText,
  DollarSign,
  Shield,
  Palette,
  Briefcase,
  ArrowLeft,
} from "lucide-react";

const documentOptions = [
  { id: "project-briefs", label: "Project Briefs", icon: FileText },
  { id: "proposals", label: "Proposals", icon: Briefcase },
  { id: "contracts-agreements", label: "Contracts & Agreements", icon: Shield },
  { id: "invoices", label: "Invoices", icon: DollarSign },
  { id: "ndas", label: "NDAs", icon: Shield },
  { id: "scope-of-work", label: "Scope of Work (SoW)", icon: FileText },
  { id: "moodboard-briefs", label: "Moodboard Briefs", icon: Palette },
  { id: "business-mood", label: "Business Mood", icon: Briefcase },
  { id: "pricing-sheets", label: "Pricing Sheets", icon: DollarSign },
  { id: "onboarding-docs", label: "Onboarding Docs", icon: FileText },
  { id: "others", label: "Others", icon: FileText },
];

export function DocumentTypesStep() {
  const { data, setStep } = useOnboardingStore();
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    data.documentTypes
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    setStep(1);
  };

  const toggleDocumentType = (typeId: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("role", data.role);
      formData.append("roleOther", data.roleOther);
      selectedTypes.forEach((type) => formData.append("documentTypes", type));

      await completeOnboarding(formData);
    } catch (error) {
      console.error("Error completing onboarding:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isValid = selectedTypes.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 w-full max-w-3xl mx-auto"
    >
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">Almost there!</h1>
          <p className="text-lg text-gray-600 mt-2">
            What types of documents do you create most often?
          </p>
          <p className="text-sm text-gray-500">Choose all that apply</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documentOptions.map((option, index) => {
          // const Icon = option.icon;
          const isSelected = selectedTypes.includes(option.id);

          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index, duration: 0.3 }}
            >
              <button
                type="button"
                onClick={() => toggleDocumentType(option.id)}
                className={`w-full py-3 px-8 rounded-full border-1 transition-all duration-200 hover:scale-105 ${
                  isSelected
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 hover:color-gray-700"
                }`}
              >
                <div className="flex items-center space-x-3">
                  {/* <Icon
                    className={`h-6 w-6 ${
                      isSelected ? "text-blue-600" : "text-gray-500"
                    }`}
                  /> */}
                  <span
                    className={`font-medium ${
                      isSelected ? "text-blue-900" : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </span>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {!isValid && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-600 text-center"
        >
          Please select at least one document type.
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="w-full max-w-3xl mx-auto flex flex-col sm:flex-row gap-3 pt-4"
      >
        <Button variant="outline" onClick={handleBack} className="h-12 flex-1 shadow-none">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={handleComplete}
          disabled={!isValid || isLoading}
          className="h-12 flex-1"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Complete Setup
        </Button>
      </motion.div>
    </motion.div>
  );
}
