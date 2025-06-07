"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { HybridSkipPanel } from "./hybrid-skip-panel";

/**
 * Interactive Tabs Component for Skip Selection
 *
 * This component provides the tab interface for browsing different skip sizes.
 * It manages tab selection state and renders the corresponding skip cards
 * through the HybridSkipPanel component.
 *
 * Features:
 * - Responsive tab sizing (mobile/tablet/desktop breakpoints)
 * - Hover state management for card animations
 * - Tab reordering to bring selected tab to front
 * - Auto-sizing tabs based on content length
 * - Horizontal scrolling on mobile/tablet
 * - Smooth transitions and animations
 */

// Type definition for tab data structure
type Tab = {
  title: string; // Display name (e.g., "Compact", "16 Yard Skip")
  value: string; // Unique identifier for the tab
  content?: string | React.ReactNode | any; // Optional content (not used in current implementation)
};

// Props interface for the Tabs component
export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[]; // Array of tab configurations
  containerClassName?: string; // Optional container styling override
  activeTabClassName?: string; // Optional active tab styling override
  tabClassName?: string; // Optional individual tab styling override
  contentClassName?: string; // Optional content area styling override
}) => {
  // State management for tab selection and ordering
  const [active, setActive] = useState<Tab>(propTabs[0]); // Currently active tab
  const [tabs, setTabs] = useState<Tab[]>(propTabs); // Tab order (can be reordered)

  /**
   * Reorders tabs to bring selected tab to the front
   * This creates a visual hierarchy in the skip cards display
   * @param idx - Index of the clicked tab
   */
  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1); // Remove selected tab
    newTabs.unshift(selectedTab[0]); // Add to front
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  // Hover state for triggering card animations in HybridSkipPanel
  const [hovering, setHovering] = useState(false);

  return (
    <>
      {/* Tab navigation container with responsive overflow behavior */}
      <div
        className={cn(
          "no-visible-scrollbar relative flex w-full max-w-full flex-row items-center justify-start overflow-x-auto [perspective:1000px] lg:overflow-visible",
          containerClassName,
        )}
      >
        {/* Render individual tab buttons */}
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx); // Reorder tabs and set as active
            }}
            onMouseEnter={() => setHovering(true)} // Trigger hover animations
            onMouseLeave={() => setHovering(false)}
            className={cn(
              // Responsive tab styling with auto-sizing and progressive breakpoints
              "relative mx-1 min-w-0 flex-shrink-0 rounded-full px-3 py-2.5 text-center text-sm font-medium whitespace-nowrap transition-all duration-200 md:px-3 md:py-2 md:text-sm lg:px-4 lg:text-xs",
              // Dynamic styling based on active state
              tab === active
                ? "bg-blue-600 text-white shadow-lg" // Active tab: blue background
                : "border border-gray-200 bg-white/80 text-gray-700 hover:bg-white dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-700", // Inactive: subtle styling with hover effects
              tabClassName,
            )}
            style={{
              transformStyle: "preserve-3d", // Enable 3D transforms for animations
            }}
          >
            <span className="relative block">{tab.title}</span>
          </button>
        ))}
      </div>

      {/* Skip card display panel with reordered tabs and hover state */}
      <HybridSkipPanel
        tabs={tabs} // Pass reordered tabs (active tab first)
        hovering={hovering} // Pass hover state for animations
        className="mt-6 w-full flex-1 md:mt-8" // Responsive spacing from tabs
      />
    </>
  );
};

/**
 * FadeInDiv Component (Legacy - Not Currently Used)
 *
 * This was the original tab content display component before HybridSkipPanel.
 * It provided stacked card animations with hover effects.
 *
 * Features that were implemented:
 * - Stacked card layout with scaled positioning
 * - Hover-triggered vertical card separation
 * - Active card bounce animation
 * - Opacity fade for background cards
 *
 * @deprecated Replaced by HybridSkipPanel for better UX
 */
export const FadeInDiv = ({
  className,
  tabs,
  hovering,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  // Determines if a tab is the active (front) tab
  const isActive = (tab: Tab) => {
    return tab.value === tabs[0].value;
  };

  return (
    <div className="relative h-full w-full">
      {/* Render each tab as a positioned card */}
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value} // Shared layout ID for smooth transitions
          style={{
            scale: 1 - idx * 0.1, // Progressive scaling (front card largest)
            top: hovering ? idx * -50 : 0, // Spread cards vertically on hover
            zIndex: -idx, // Stack order (front card on top)
            opacity: idx < 3 ? 1 - idx * 0.1 : 0, // Fade background cards
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0, // Bounce animation for active card
          }}
          className={cn("absolute top-0 left-0 h-full w-full", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
