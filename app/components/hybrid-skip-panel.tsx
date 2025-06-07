"use client";

import { motion } from "framer-motion";
import {
  Calculator,
  Clock,
  Shield,
  Truck,
  Zap,
  MapPin,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { skipData } from "@/data/skip-data";
import type { Skip } from "@/types";

/**
 * HybridSkipPanel Component
 *
 * The main display component for skip information cards. This component renders
 * detailed skip specifications, pricing, and capabilities in an interactive card format.
 *
 * Features:
 * - Single active card display (no stacking)
 * - Comprehensive skip information (specifications, pricing, permissions)
 * - Responsive design for mobile, tablet, and desktop
 * - Smooth animations and transitions
 * - Dark mode support
 * - Interactive visual feedback
 *
 * Card Information Displayed:
 * - Skip name, description, and pricing
 * - Delivery time, insurance, and postcode
 * - Capacity, dimensions, and weight specifications
 * - Road placement and heavy waste permissions
 * - Recommended use cases with visual tags
 */

// Interface for tab data passed from parent Tabs component
interface Tab {
  title: string; // Display name of the skip
  value: string; // Unique identifier
}

/**
 * SkipContent Component
 *
 * Renders the detailed information card for a single skip.
 * This is the main content that users see when selecting a skip size.
 *
 * Layout Structure:
 * 1. Header with gradient background (name, pricing, basic info)
 * 2. Specifications grid (capacity, dimensions, weight)
 * 3. Permissions section (road placement, heavy waste)
 * 4. Recommended use cases with tags
 *
 * @param skip - Complete skip data object with all specifications
 */
const SkipContent = ({ skip }: { skip: Skip }) => {
  return (
    <div className="w-full max-w-full overflow-hidden rounded-2xl border border-white/20 bg-white/95 shadow-2xl backdrop-blur-2xl md:rounded-3xl dark:bg-gray-900/95">
      {/* Header section with gradient background and pricing */}
      <div
        className={`bg-gradient-to-r ${skip.gradient} relative overflow-hidden p-4 text-white md:p-8`}
      >
        {/* Subtle overlay for better text readability */}
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10">
          {/* Header content with responsive layout: stacked on mobile, side-by-side on desktop */}
          <div className="flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
            {/* Left section: Skip name, description, and service details */}
            <div className="flex-1">
              <h3 className="mb-2 text-xl font-bold md:text-3xl">
                {skip.name} Skip
              </h3>
              <p className="text-sm text-white/90 md:text-lg">
                {skip.description}
              </p>
              {/* Service badges with icons - responsive wrapping */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs md:gap-4 md:text-sm">
                <div className="flex items-center space-x-1 whitespace-nowrap">
                  <Clock className="h-3 w-3 md:h-4 md:w-4" />
                  <span>{skip.deliveryTime}</span>
                </div>
                <div className="flex items-center space-x-1 whitespace-nowrap">
                  <Shield className="h-3 w-3 md:h-4 md:w-4" />
                  <span>Fully insured</span>
                </div>
                <div className="flex items-center space-x-1 whitespace-nowrap">
                  <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                  <span>{skip.postcode}</span>
                </div>
              </div>
            </div>
            {/* Right section: Pricing information */}
            <div className="text-left md:text-right">
              {/* Main price with responsive sizing */}
              <div className="mb-1 text-3xl font-bold md:text-5xl">
                £{skip.final_price}
              </div>
              {/* Hire period information */}
              <div className="text-xs text-white/80 md:text-sm">
                {skip.hire_period_days}-day hire period
              </div>
              {/* Price breakdown with VAT and optional transport */}
              <div className="mt-1 text-xs text-white/70">
                £{skip.price_before_vat} + £
                {Math.round((skip.price_before_vat * skip.vat) / 100)} VAT
                {skip.transport_cost && ` + £${skip.transport_cost} transport`}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area with specifications and details */}
      <div className="space-y-4 p-3 md:space-y-8 md:p-8">
        {/* Skip specifications grid - responsive layout */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-6">
          {/* Capacity specification card */}
          <div className="relative overflow-hidden rounded-lg bg-gray-50 p-2.5 text-center md:rounded-2xl md:p-4 dark:bg-gray-800">
            {/* Gradient accent bar matching skip theme */}
            <div
              className={`absolute top-0 right-0 left-0 h-1 bg-gradient-to-r ${skip.gradient}`}
            />
            {/* Icon with skip-themed gradient background */}
            <div
              className={`mx-auto mb-1.5 h-7 w-7 rounded-full bg-gradient-to-r md:mb-3 md:h-12 md:w-12 ${skip.gradient} flex items-center justify-center`}
            >
              <Calculator className="h-3.5 w-3.5 text-white md:h-6 md:w-6" />
            </div>
            {/* Capacity value with responsive text sizing */}
            <div className="text-xs font-semibold whitespace-nowrap text-gray-900 md:text-base dark:text-white">
              {skip.capacity}
            </div>
            {/* Label */}
            <div className="text-xs text-gray-600 md:text-sm dark:text-gray-400">
              Capacity
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg bg-gray-50 p-2.5 text-center md:rounded-2xl md:p-4 dark:bg-gray-800">
            <div
              className={`absolute top-0 right-0 left-0 h-1 bg-gradient-to-r ${skip.gradient}`}
            />
            <div
              className={`mx-auto mb-1.5 h-7 w-7 rounded-full bg-gradient-to-r md:mb-3 md:h-12 md:w-12 ${skip.gradient} flex items-center justify-center`}
            >
              <Truck className="h-3.5 w-3.5 text-white md:h-6 md:w-6" />
            </div>
            <div className="text-xs font-semibold whitespace-nowrap text-gray-900 md:text-base dark:text-white">
              {skip.dimensions}
            </div>
            <div className="text-xs text-gray-600 md:text-sm dark:text-gray-400">
              Dimensions
            </div>
          </div>
          <div className="relative col-span-2 overflow-hidden rounded-lg bg-gray-50 p-2.5 text-center md:col-span-1 md:rounded-2xl md:p-4 dark:bg-gray-800">
            <div
              className={`absolute top-0 right-0 left-0 h-1 bg-gradient-to-r ${skip.gradient}`}
            />
            <div
              className={`mx-auto mb-1.5 h-7 w-7 rounded-full bg-gradient-to-r md:mb-3 md:h-12 md:w-12 ${skip.gradient} flex items-center justify-center`}
            >
              <Zap className="h-3.5 w-3.5 text-white md:h-6 md:w-6" />
            </div>
            <div className="text-xs font-semibold whitespace-nowrap text-gray-900 md:text-base dark:text-white">
              {skip.weight}
            </div>
            <div className="text-xs text-gray-600 md:text-sm dark:text-gray-400">
              Max weight
            </div>
          </div>
        </div>

        {/* Skip permissions and restrictions section */}
        <div>
          <h4 className="mb-3 flex items-center text-sm font-semibold text-gray-900 md:mb-4 md:text-base dark:text-white">
            {/* Section icon with gradient background */}
            <div
              className={`mr-2 h-4 w-4 rounded bg-gradient-to-r md:h-5 md:w-5 ${skip.gradient} flex items-center justify-center`}
            >
              <Shield className="h-2.5 w-2.5 text-white md:h-3 md:w-3" />
            </div>
            Skip permissions & capabilities
          </h4>
          {/* Permissions grid - single column on mobile, two columns on desktop */}
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
            {/* Road placement permission card */}
            <div className="flex items-start space-x-2 rounded-lg bg-gray-50 p-2.5 md:items-center md:space-x-3 md:rounded-xl md:p-3 dark:bg-gray-800">
              {/* Dynamic icon based on permission status */}
              {skip.allowed_on_road ? (
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500 md:mt-0 md:h-5 md:w-5" />
              ) : (
                <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500 md:mt-0 md:h-5 md:w-5" />
              )}
              <div>
                <div className="text-sm font-medium text-gray-900 md:text-base dark:text-white">
                  Road placement
                </div>
                {/* Dynamic description based on permission */}
                <div className="text-xs text-gray-600 md:text-sm dark:text-gray-400">
                  {skip.allowed_on_road
                    ? "Allowed on road/driveway"
                    : "Private land only"}
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-2 rounded-lg bg-gray-50 p-2.5 md:items-center md:space-x-3 md:rounded-xl md:p-3 dark:bg-gray-800">
              {skip.allows_heavy_waste ? (
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500 md:mt-0 md:h-5 md:w-5" />
              ) : (
                <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500 md:mt-0 md:h-5 md:w-5" />
              )}
              <div>
                <div className="text-sm font-medium text-gray-900 md:text-base dark:text-white">
                  Heavy waste
                </div>
                <div className="text-xs text-gray-600 md:text-sm dark:text-gray-400">
                  {skip.allows_heavy_waste
                    ? "Heavy materials allowed"
                    : "Light waste only"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended use cases with visual tags */}
        <div>
          <h4 className="mb-3 text-sm font-semibold text-gray-900 md:text-base dark:text-white">
            Recommended for
          </h4>
          {/* Flexible tag container with wrapping */}
          <div className="flex flex-wrap gap-2">
            {skip.bestFor.map((item, index) => (
              <span
                key={index}
                className={`bg-gradient-to-r px-3 py-1.5 md:px-4 md:py-2 ${skip.gradient} bg-opacity-10 rounded-full border border-white/20 text-xs font-medium text-white md:text-sm`}
                style={{
                  // Apply gradient background with custom styling
                  background: `linear-gradient(to right, ${skip.gradient})`,
                  opacity: 0.9,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * HybridSkipPanel Export Component
 *
 * The main container component that manages skip card display and animations.
 * Only renders the active (selected) skip card to prevent stacking.
 *
 * Features:
 * - Single card display (no stacking behind)
 * - Smooth entrance animations with layout transitions
 * - Subtle floating animation loop
 * - Dynamic skip data lookup
 * - Responsive container sizing
 *
 * Animation Details:
 * - Layout: Shared layout ID for smooth transitions between tabs
 * - Scale: Consistent 1.0 scale (no size changes)
 * - Float: Gentle vertical movement (y: [0, 40, 0])
 * - Timing: 0.3s for scale, 0.6s for floating with custom easing
 *
 * @param tabs - Array of tab data (reordered with active first)
 * @param className - Optional styling override
 * @param hovering - Hover state from parent (not currently used)
 */
export const HybridSkipPanel = ({
  tabs,
  className,
  hovering,
}: {
  tabs: Tab[]; // Tab data array from parent Tabs component
  className?: string; // Optional container styling
  hovering?: boolean; // Hover state (passed from Tabs but not used)
}) => {
  /**
   * Determines if a tab is the active (front) tab
   * Only the first tab in the reordered array is considered active
   */
  const isActive = (tab: Tab) => {
    return tab.value === tabs[0].value;
  };

  return (
    <div className="relative h-full w-full">
      {tabs.map((tab, idx) => {
        // Only render the active card (prevents stacked cards)
        if (!isActive(tab)) return null;

        return (
          <motion.div
            key={tab.value}
            layoutId={tab.value} // Shared layout ID for smooth tab transitions
            animate={{
              scale: 1.0, // Consistent scale (no size changes)
              y: [0, 40, 0], // Gentle floating animation
            }}
            transition={{
              scale: { duration: 0.3, ease: "easeInOut" }, // Quick scale transition
              y: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }, // Smooth floating with custom bezier
            }}
            className={cn("absolute top-0 left-0 h-full w-full", className)}
          >
            {/* Render the skip information card with data lookup */}
            <SkipContent
              skip={skipData.find((skip) => skip.id.toString() === tab.value)!}
            />
          </motion.div>
        );
      })}
    </div>
  );
};
