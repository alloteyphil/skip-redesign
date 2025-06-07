import { LucideIcon } from "lucide-react";

// API response type from the backend
export interface SkipApiData {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

// Enhanced skip data with display properties
export interface Skip {
  // API data
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;

  // Computed/derived properties
  final_price: number;
  price_with_vat: number;

  // Display properties
  name: string;
  scale: number;
  popularity: number;
  icon: LucideIcon;
  gradient: string;
  description: string;
  capacity: string;
  dimensions: string;
  weight: string;
  deliveryTime: string;
  bestFor: string[];
  restrictions: string[];
  useCases: UseCase[];
  badge?: string;
}

export interface UseCase {
  type: string;
  percentage: number;
}

export interface SkipVisualizerProps {
  skip: Skip;
  isActive: boolean;
  position: number;
  totalSkips: number;
}

export interface SkipCarouselProps {
  skips: Skip[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export interface InformationPanelProps {
  skip: Skip;
}

export interface PremiumButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
}
