"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOnboardingStore } from "@/lib/hooks/use-onboarding-store";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  User,
  MessageSquare,
  Settings,
  Edit3,
} from "lucide-react";

const roleOptions = [
  { id: "freelancer", label: "Freelancer", icon: User },
  { id: "small-studio", label: "Small Studio / Agency", icon: Users },
  { id: "solopreneur", label: "Solopreneur", icon: Briefcase },
  { id: "brand-consultant", label: "Brand Consultant", icon: MessageSquare },
  {
    id: "creative-project-manager",
    label: "Creative Project Manager",
    icon: Settings,
  },
  { id: "other", label: "Other", icon: Edit3 },
];

export function RoleStep() {
  const { data, updateData, setStep } = useOnboardingStore();
  const [selectedRole, setSelectedRole] = useState(data.role);
  const [otherRole, setOtherRole] = useState(data.roleOther);

  const handleNext = () => {
    updateData({ role: selectedRole, roleOther: otherRole });
    setStep(2);
  };

  const isValid =
    selectedRole && (selectedRole !== "other" || otherRole.trim());

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">Welcome!</h1>
          <p className="text-lg text-gray-600 mt-2">
            What best describes your role?
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roleOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            >
              <button
                type="button"
                onClick={() => setSelectedRole(option.id)}
                className={`w-full py-3 px-8 rounded-full border-1 transition-all duration-200 hover:scale-105 ${
                  selectedRole === option.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 hover:color-gray-700"
                }`}
              >
                <div className="flex items-center space-x-3">
                  {/* <Icon className={`h-6 w-6 ${selectedRole === option.id ? "text-blue-600" : "text-gray-500"}`} /> */}
                  <span
                    className={`font-medium ${
                      selectedRole === option.id
                        ? "text-blue-900"
                        : "text-gray-700"
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

      {selectedRole === "other" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="relative mt-2 w-full"
        >
          <div className="relative">
            <input
              type="text"
              id="otherRole"
              value={otherRole}
              onChange={(e) => setOtherRole(e.target.value)}
              placeholder=" "
              className="peer block w-full appearance-none rounded-full border border-gray-300 bg-transparent px-6 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            />
            <label
              htmlFor="otherRole"
              className="absolute top-2 left-4 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-[16px] text-gray-500 duration-300 
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100
          peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
            >
              Please specify your role
            </label>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="flex"
      >
        <Button
          onClick={handleNext}
          disabled={!isValid}
          className="w-full h-12"
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  );
}
