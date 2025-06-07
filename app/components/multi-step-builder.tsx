"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import {
  MapPin,
  Trash2,
  Package,
  FileCheck,
  Calendar,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs } from "./tabs";
import { skipData } from "@/data/skip-data";

/**
 * Multi-Step Skip Hire Booking Flow
 *
 * This component implements a 6-step booking process for skip hire services:
 * 1. Postcode - Location verification and availability check
 * 2. Waste Type - Category selection for proper skip recommendation
 * 3. Select Skip - Size selection with interactive skip cards and specifications
 * 4. Permit Check - Requirements verification for placement location
 * 5. Choose Date - Delivery date scheduling
 * 6. Payment - Complete booking with customer details
 *
 * Features:
 * - Responsive design (mobile/tablet/desktop)
 * - Auto-scrolling step indicator on mobile/tablet devices
 * - Animated transitions between steps using Framer Motion
 * - State management for user selections across steps
 * - Glass-morphism design with blue gradient background
 * - Interactive skip selection with detailed specifications
 */

// Step configuration defining the booking flow sequence
const steps = [
  {
    id: 1,
    title: "Postcode",
    icon: MapPin,
    component: "PostcodeStep",
  },
  {
    id: 2,
    title: "Waste Type",
    icon: Trash2,
    component: "WasteTypeStep",
  },
  {
    id: 3,
    title: "Select Skip",
    icon: Package,
    component: "SelectSkipStep",
  },
  {
    id: 4,
    title: "Permit Check",
    icon: FileCheck,
    component: "PermitCheckStep",
  },
  {
    id: 5,
    title: "Choose Date",
    icon: Calendar,
    component: "ChooseDateStep",
  },
  {
    id: 6,
    title: "Payment",
    icon: CreditCard,
    component: "PaymentStep",
  },
];

// Props interface for the step progress indicator component
interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

/**
 * StepIndicator Component
 *
 * Displays the current progress through the booking flow with visual indicators.
 * Features auto-scrolling on mobile/tablet to keep current step visible.
 *
 * Responsive behavior:
 * - Mobile/Tablet (< 1024px): Horizontal scroll with auto-centering
 * - Desktop (≥ 1024px): All steps visible, no scroll
 *
 * @param currentStep - The currently active step (1-indexed)
 * @param totalSteps - Total number of steps in the flow
 */
const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  // Reference to the scroll container for auto-scrolling functionality
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect: Centers the current step in viewport on mobile/tablet
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const stepWidth = container.scrollWidth / steps.length;
      // Calculate scroll position to center current step
      const targetScroll =
        (currentStep - 1) * stepWidth -
        container.clientWidth / 2 +
        stepWidth / 2;

      // Smooth scroll to center the current step
      container.scrollTo({
        left: Math.max(0, targetScroll), // Prevent negative scroll
        behavior: "smooth",
      });
    }
  }, [currentStep]); // Trigger when step changes

  return (
    <div className="mx-auto mb-6 w-full max-w-4xl px-4 md:mb-8">
      {/* Step indicator container with responsive overflow handling */}
      <div
        ref={scrollContainerRef}
        className="flex items-center justify-between overflow-x-auto pb-2 lg:overflow-visible lg:pb-0"
      >
        {steps.map((step, index) => {
          // Determine step state for styling and behavior
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const Icon = step.icon;

          return (
            <div key={step.id} className="flex items-center">
              {/* Individual step indicator */}
              <div className="flex min-w-0 flex-shrink-0 flex-col items-center">
                {/* Animated step circle with dynamic colors and scaling */}
                <motion.div
                  initial={false}
                  animate={{
                    // Dynamic background color based on step state
                    backgroundColor: isCompleted
                      ? "#10b981" // Green for completed
                      : isCurrent
                        ? "#3b82f6" // Blue for current
                        : "#6b7280", // Gray for upcoming
                    scale: isCurrent ? 1.05 : 1, // Slight scale up for current step
                  }}
                  className={cn(
                    // Responsive sizing: smaller on mobile, larger on desktop
                    "mb-2 flex h-7 w-7 items-center justify-center rounded-full font-semibold text-white md:h-12 md:w-12",
                    "border-2 border-white shadow-lg",
                  )}
                >
                  {/* Show checkmark for completed steps, icon for others */}
                  {isCompleted ? (
                    <Check className="h-3 w-3 md:h-6 md:w-6" />
                  ) : (
                    <Icon className="h-3 w-3 md:h-6 md:w-6" />
                  )}
                </motion.div>

                {/* Step title with dynamic styling */}
                <span
                  className={cn(
                    "text-center text-xs font-medium whitespace-nowrap md:text-sm",
                    // Highlight current step with blue color
                    isCurrent
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400",
                  )}
                >
                  {step.title}
                </span>
              </div>

              {/* Connecting line between steps (not shown after last step) */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={false}
                  animate={{
                    // Line turns green when step is completed
                    backgroundColor: isCompleted ? "#10b981" : "#e5e7eb",
                  }}
                  className="mx-2 h-1 w-8 flex-shrink-0 rounded-full md:mx-4 md:w-16"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Individual Step Components
 *
 * Each step component handles a specific part of the booking flow.
 * All components use consistent responsive design patterns.
 */

/**
 * PostcodeStep - Step 1: Location Verification
 * Collects user's postcode to check service availability and calculate pricing
 */
const PostcodeStep = () => (
  <div className="mx-auto max-w-md px-4 text-center">
    <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
      Enter Your Postcode
    </h2>
    <p className="mb-6 text-sm text-gray-600 md:text-base dark:text-gray-400">
      We need your postcode to check availability and calculate pricing
    </p>
    <div className="space-y-4">
      {/* Postcode input with responsive styling and accessibility */}
      <input
        type="text"
        placeholder="Enter postcode (e.g. NR32 1AB)"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
      />
    </div>
  </div>
);

/**
 * WasteTypeStep - Step 2: Waste Category Selection
 * Allows users to select the type of waste for proper skip recommendation
 * Includes visual selection feedback and responsive grid layout
 */
const WasteTypeStep = () => {
  // State to track which waste type is selected
  const [selectedWasteType, setSelectedWasteType] = useState<string | null>(
    null,
  );

  return (
    <div className="mx-auto max-w-2xl px-4 text-center">
      <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
        What Type of Waste?
      </h2>
      <p className="mb-6 text-sm text-gray-600 md:mb-8 md:text-base dark:text-gray-400">
        Select the type of waste you'll be disposing of
      </p>
      {/* Responsive grid: single column on mobile, two columns on desktop */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[
          "Household Waste",
          "Garden Waste",
          "Construction Debris",
          "Mixed Waste",
        ].map((type) => {
          const isSelected = selectedWasteType === type;
          return (
            <button
              key={type}
              onClick={() => setSelectedWasteType(type)}
              className={cn(
                "rounded-lg border p-4 text-gray-900 transition-all duration-200 dark:text-white",
                // Dynamic styling based on selection state
                isSelected
                  ? "ring-opacity-50 border-blue-500 bg-blue-50 ring-2 ring-blue-500 dark:bg-blue-900/30"
                  : "border-gray-300 hover:border-blue-500 hover:bg-blue-50 dark:border-gray-600 dark:hover:bg-blue-900/20",
              )}
            >
              <span
                className={cn(
                  "font-medium",
                  // Highlight selected option text
                  isSelected ? "text-blue-700 dark:text-blue-300" : "",
                )}
              >
                {type}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/**
 * SelectSkipStep - Step 3: Skip Size Selection
 * The core step where users browse and select skip sizes.
 * Features interactive tabs with detailed skip specifications and pricing.
 * Uses the Tabs component which includes the HybridSkipPanel for skip cards.
 */
const SelectSkipStep = () => {
  // Transform skip data into tab format for the Tabs component
  const tabs = skipData.map((skip) => ({
    title: skip.name, // e.g., "Compact", "Standard", "Large"
    value: skip.id.toString(),
  }));

  return (
    <div className="w-full">
      {/* Step header with responsive typography */}
      <div className="mb-6 px-4 text-center md:mb-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
          Choose Your Skip Size
        </h2>
        <p className="text-sm text-gray-600 md:text-base dark:text-gray-400">
          Select the skip size that best suits your needs
        </p>
      </div>

      {/* Container for the interactive skip selection tabs and cards */}
      {/* Progressive heights: mobile 45rem → desktop 50rem → large 55rem */}
      <div className="relative mx-auto mb-6 flex min-h-[45rem] w-full max-w-5xl flex-col items-start justify-start px-4 [perspective:1000px] md:mb-8 md:min-h-[50rem] lg:min-h-[55rem]">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};

const PermitCheckStep = () => {
  const [selectedPermit, setSelectedPermit] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-2xl px-4 text-center">
      <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
        Permit Requirements
      </h2>
      <p className="mb-6 text-sm text-gray-600 md:mb-8 md:text-base dark:text-gray-400">
        Where will the skip be placed?
      </p>
      <div className="space-y-4">
        {["On my private property/driveway", "On the road/public highway"].map(
          (option) => {
            const isSelected = selectedPermit === option;
            return (
              <button
                key={option}
                onClick={() => setSelectedPermit(option)}
                className={cn(
                  "w-full rounded-lg border p-4 text-left text-gray-900 transition-all duration-200 dark:text-white",
                  isSelected
                    ? "ring-opacity-50 border-blue-500 bg-blue-50 ring-2 ring-blue-500 dark:bg-blue-900/30"
                    : "border-gray-300 hover:border-blue-500 hover:bg-blue-50 dark:border-gray-600 dark:hover:bg-blue-900/20",
                )}
              >
                <span
                  className={cn(
                    "font-medium",
                    isSelected ? "text-blue-700 dark:text-blue-300" : "",
                  )}
                >
                  {option}
                </span>
              </button>
            );
          },
        )}
      </div>
    </div>
  );
};

const ChooseDateStep = () => (
  <div className="mx-auto max-w-md px-4 text-center">
    <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
      Choose Delivery Date
    </h2>
    <p className="mb-6 text-sm text-gray-600 md:text-base dark:text-gray-400">
      When would you like your skip delivered?
    </p>
    <div className="space-y-4">
      <input
        type="date"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      />
    </div>
  </div>
);

const PaymentStep = () => (
  <div className="mx-auto max-w-md px-4 text-center">
    <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
      Payment Details
    </h2>
    <p className="mb-6 text-sm text-gray-600 md:text-base dark:text-gray-400">
      Complete your skip hire booking
    </p>
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
      />
      <input
        type="email"
        placeholder="Email Address"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
      />
      <button className="w-full rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700">
        Complete Booking
      </button>
    </div>
  </div>
);

/**
 * Navigation Component
 *
 * Provides Previous/Next navigation between steps with disabled states.
 * Includes step counter and responsive spacing.
 */
interface NavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  canGoNext: boolean; // Controls if Next button is enabled
}

const Navigation = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  canGoNext,
}: NavigationProps) => (
  // Navigation container with responsive spacing from content above
  <div className="mt-24 flex items-center justify-between border-t border-gray-200 pt-8 md:mt-12 md:pt-4 dark:border-gray-700">
    <button
      onClick={onPrevious}
      disabled={currentStep === 1}
      className={cn(
        "flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors md:px-6 md:py-3 md:text-base",
        currentStep === 1
          ? "cursor-not-allowed text-gray-400"
          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
      )}
    >
      <ChevronLeft className="h-5 w-5" />
      <span>Previous</span>
    </button>

    <span className="text-sm text-gray-500 dark:text-gray-400">
      Step {currentStep} of {totalSteps}
    </span>

    {currentStep < totalSteps ? (
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={cn(
          "flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors md:px-6 md:py-3 md:text-base",
          canGoNext
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "cursor-not-allowed bg-gray-300 text-gray-500",
        )}
      >
        <span>Next</span>
        <ChevronRight className="h-5 w-5" />
      </button>
    ) : (
      <div className="w-24" />
    )}
  </div>
);

/**
 * Main Multi-Step Builder Component
 *
 * The root component that orchestrates the entire booking flow.
 * Manages global state for current step and navigation logic.
 *
 * Features:
 * - Step navigation with validation
 * - Responsive layout with blue gradient background
 * - Glass-morphism design for the main content card
 * - Smooth animations between steps
 */
export const MultiStepBuilder = () => {
  // Global state for tracking current step (1-indexed)
  const [currentStep, setCurrentStep] = useState(1);
  // Controls whether user can proceed to next step (for validation)
  const [canGoNext, setCanGoNext] = useState(true);

  // Navigate to next step with boundary checking
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Navigate to previous step with boundary checking
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Render the appropriate step component based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PostcodeStep />;
      case 2:
        return <WasteTypeStep />;
      case 3:
        return <SelectSkipStep />; // The main skip selection interface
      case 4:
        return <PermitCheckStep />;
      case 5:
        return <ChooseDateStep />;
      case 6:
        return <PaymentStep />;
      default:
        return <PostcodeStep />; // Fallback to first step
    }
  };

  return (
    /* Main container with responsive blue gradient background */
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-6 md:py-12 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Step progress indicator with auto-scroll functionality */}
        <StepIndicator currentStep={currentStep} totalSteps={steps.length} />

        {/* Main content card with glass-morphism effect and step transitions */}
        <motion.div
          key={currentStep} // Re-animate when step changes
          initial={{ opacity: 0, x: 20 }} // Enter from right
          animate={{ opacity: 1, x: 0 }} // Animate to center
          exit={{ opacity: 0, x: -20 }} // Exit to left
          transition={{ duration: 0.3 }} // Smooth 300ms transition
          className="rounded-2xl border border-white/20 bg-white/80 p-4 shadow-2xl backdrop-blur-xl md:rounded-3xl md:p-8 dark:bg-gray-900/80"
        >
          {/* Render current step content */}
          {renderStepContent()}

          {/* Navigation controls */}
          <Navigation
            currentStep={currentStep}
            totalSteps={steps.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            canGoNext={canGoNext}
          />
        </motion.div>
      </div>
    </div>
  );
};
