"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Calculator,
  Clock,
  Shield,
  Truck,
  Users,
  Zap,
  MapPin,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { InformationPanelProps } from "@/types";

/**
 * InformationPanel Component
 *
 * A comprehensive detailed view component for displaying complete skip information.
 * This component provides an in-depth look at skip specifications, pricing,
 * capabilities, and restrictions in a visually rich format.
 *
 * Features:
 * - Animated entrance with smooth transitions (Framer Motion)
 * - Gradient-themed design matching skip branding
 * - Comprehensive information display sections:
 *   - Header with pricing and service details
 *   - Key specifications grid (capacity, dimensions, weight)
 *   - Permissions and capability indicators
 *   - Animated use case visualization with progress bars
 *   - Recommended usage tags with staggered animations
 *   - Detailed pricing breakdown
 *   - Important restrictions and considerations
 * - Glass-morphism design with backdrop blur
 * - Full dark mode support
 * - Responsive design (desktop-focused)
 *
 * Layout Structure:
 * 1. Gradient header with skip name, description, pricing, and service badges
 * 2. Specifications grid with icon-based cards
 * 3. Permissions section with status indicators
 * 4. Use case visualization with animated progress bars
 * 5. Recommended usage tags with entrance animations
 * 6. Detailed pricing breakdown table
 * 7. Restrictions section with warning indicators
 *
 * @param skip - Complete skip data object containing all specifications and details
 */
export const InformationPanel = ({ skip }: InformationPanelProps) => {
  return (
    <motion.div
      key={skip.id} // Unique key for proper re-rendering when skip changes
      initial={{ opacity: 0, y: 30 }} // Enter from below with fade
      animate={{ opacity: 1, y: 0 }} // Smooth entrance animation
      exit={{ opacity: 0, y: -30 }} // Exit upward with fade
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }} // Custom easing curve
      className="overflow-hidden rounded-3xl border border-white/20 bg-white/95 shadow-2xl backdrop-blur-2xl dark:bg-gray-900/95"
    >
      {/* Header section with gradient background and comprehensive skip details */}
      <div
        className={`bg-gradient-to-r ${skip.gradient} relative overflow-hidden p-8 text-white`}
      >
        {/* Subtle overlay for improved text readability */}
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10">
          {/* Header content layout: skip info on left, pricing on right */}
          <div className="flex items-center justify-between">
            {/* Left section: Skip identification and service details */}
            <div>
              <h3 className="mb-2 text-3xl font-bold">{skip.name} Skip</h3>
              <p className="text-lg text-white/90">{skip.description}</p>
              {/* Service badges with icons */}
              <div className="mt-4 flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{skip.deliveryTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4" />
                  <span>Fully insured</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{skip.postcode}</span>
                </div>
              </div>
            </div>
            {/* Right section: Pricing information */}
            <div className="text-right">
              {/* Main price display */}
              <div className="mb-1 text-5xl font-bold">£{skip.final_price}</div>
              {/* Hire period information */}
              <div className="text-sm text-white/80">
                {skip.hire_period_days}-day hire period
              </div>
              {/* Price breakdown preview */}
              <div className="mt-1 text-xs text-white/70">
                £{skip.price_before_vat} + £
                {Math.round((skip.price_before_vat * skip.vat) / 100)} VAT
                {skip.transport_cost && ` + £${skip.transport_cost} transport`}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area with detailed information sections */}
      <div className="space-y-8 p-8">
        {/* Key specifications grid - three-column layout for desktop */}
        <div className="grid grid-cols-3 gap-6">
          {/* Capacity specification card */}
          <div className="relative overflow-hidden rounded-2xl bg-gray-50 p-4 text-center dark:bg-gray-800">
            {/* Gradient accent bar matching skip theme */}
            <div
              className={`absolute top-0 right-0 left-0 h-1 bg-gradient-to-r ${skip.gradient}`}
            />
            {/* Icon with skip-themed gradient background */}
            <div
              className={`mx-auto mb-3 h-12 w-12 rounded-full bg-gradient-to-r ${skip.gradient} flex items-center justify-center`}
            >
              <Calculator className="h-6 w-6 text-white" />
            </div>
            {/* Capacity value */}
            <div className="font-semibold text-gray-900 dark:text-white">
              {skip.capacity}
            </div>
            {/* Label */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Capacity
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-gray-50 p-4 text-center dark:bg-gray-800">
            <div
              className={`absolute top-0 right-0 left-0 h-1 bg-gradient-to-r ${skip.gradient}`}
            />
            <div
              className={`mx-auto mb-3 h-12 w-12 rounded-full bg-gradient-to-r ${skip.gradient} flex items-center justify-center`}
            >
              <Truck className="h-6 w-6 text-white" />
            </div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {skip.dimensions}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Dimensions
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-gray-50 p-4 text-center dark:bg-gray-800">
            <div
              className={`absolute top-0 right-0 left-0 h-1 bg-gradient-to-r ${skip.gradient}`}
            />
            <div
              className={`mx-auto mb-3 h-12 w-12 rounded-full bg-gradient-to-r ${skip.gradient} flex items-center justify-center`}
            >
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {skip.weight}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Max weight
            </div>
          </div>
        </div>

        {/* Skip permissions and restrictions section */}
        <div>
          <h4 className="mb-4 flex items-center font-semibold text-gray-900 dark:text-white">
            {/* Section icon with gradient background */}
            <div
              className={`mr-2 h-5 w-5 rounded bg-gradient-to-r ${skip.gradient} flex items-center justify-center`}
            >
              <Shield className="h-3 w-3 text-white" />
            </div>
            Skip permissions & capabilities
          </h4>
          {/* Permissions grid - two-column layout */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
              {skip.allowed_on_road ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  Road placement
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {skip.allowed_on_road
                    ? "Allowed on road/driveway"
                    : "Private land only"}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
              {skip.allows_heavy_waste ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  Heavy waste
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {skip.allows_heavy_waste
                    ? "Heavy materials allowed"
                    : "Light waste only"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Use case visualization with animated progress bars */}
        <div>
          <h4 className="mb-4 flex items-center font-semibold text-gray-900 dark:text-white">
            {/* Section icon with gradient background */}
            <div
              className={`mr-2 h-5 w-5 rounded bg-gradient-to-r ${skip.gradient} flex items-center justify-center`}
            >
              <Users className="h-3 w-3 text-white" />
            </div>
            Perfect for these projects
          </h4>
          {/* Use case items with animated progress indicators */}
          <div className="space-y-3">
            {skip.useCases.map((useCase, index) => (
              <div key={index} className="flex items-center justify-between">
                {/* Use case type label */}
                <span className="text-gray-700 dark:text-gray-300">
                  {useCase.type}
                </span>
                {/* Progress bar and percentage display */}
                <div className="flex items-center space-x-3">
                  {/* Animated progress bar container */}
                  <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${skip.gradient} rounded-full`}
                      initial={{ width: 0 }} // Start empty
                      animate={{ width: `${useCase.percentage}%` }} // Animate to percentage
                      transition={{ duration: 1, delay: index * 0.1 }} // Staggered animation
                    />
                  </div>
                  {/* Percentage label */}
                  <span className="w-8 text-sm font-medium text-gray-600 dark:text-gray-400">
                    {useCase.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended usage tags with staggered entrance animations */}
        <div>
          <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
            Recommended for
          </h4>
          {/* Flexible tag container with wrapping */}
          <div className="flex flex-wrap gap-2">
            {skip.bestFor.map((item, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }} // Start small and invisible
                animate={{ opacity: 1, scale: 1 }} // Grow to full size
                transition={{ duration: 0.3, delay: index * 0.05 }} // Staggered entrance
                className={`bg-gradient-to-r px-4 py-2 ${skip.gradient} bg-opacity-10 rounded-full border border-white/20 text-sm font-medium text-white`}
                style={{
                  // Custom gradient background from skip theme
                  background: `linear-gradient(to right, ${skip.gradient
                    .replace("from-", "")
                    .replace("via-", ", ")
                    .replace("to-", ", ")})`,
                  opacity: 0.9,
                }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Detailed pricing breakdown table */}
        <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
          <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
            Pricing breakdown
          </h4>
          {/* Pricing items with consistent spacing */}
          <div className="space-y-2 text-sm">
            {/* Base price before VAT */}
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Base price:
              </span>
              <span className="font-medium">£{skip.price_before_vat}</span>
            </div>
            {/* VAT calculation display */}
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                VAT ({skip.vat}%):
              </span>
              <span className="font-medium">
                £{Math.round((skip.price_before_vat * skip.vat) / 100)}
              </span>
            </div>
            {/* Optional transport cost (if applicable) */}
            {skip.transport_cost && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Transport cost:
                </span>
                <span className="font-medium">£{skip.transport_cost}</span>
              </div>
            )}
            {/* Total price with emphasis */}
            <div className="flex justify-between border-t border-gray-200 pt-2 font-semibold dark:border-gray-700">
              <span>Total:</span>
              <span className="text-lg">£{skip.final_price}</span>
            </div>
          </div>
        </div>

        {/* Important restrictions and considerations section */}
        {skip.restrictions.length > 0 && (
          <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
            {/* Section header with warning icon */}
            <div className="mb-3 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Important considerations
              </h4>
            </div>
            {/* Restriction items with bullet points */}
            <div className="space-y-2">
              {skip.restrictions.map((restriction, index) => (
                <div key={index} className="flex items-start space-x-3 text-sm">
                  {/* Amber bullet point */}
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-amber-500" />
                  {/* Restriction text with warning styling */}
                  <span className="text-amber-700 dark:text-amber-400">
                    {restriction}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
