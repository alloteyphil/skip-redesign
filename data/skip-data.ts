import {
  Home,
  Building,
  Factory,
  Truck as TruckIcon,
  Warehouse,
} from "lucide-react";
import { Skip, SkipApiData } from "@/types";

// Raw API data
const rawApiData: SkipApiData[] = [
  {
    id: 17933,
    size: 4,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 278,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:52.813",
    allowed_on_road: true,
    allows_heavy_waste: true,
  },
  {
    id: 17934,
    size: 6,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 305,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:52.992",
    allowed_on_road: true,
    allows_heavy_waste: true,
  },
  {
    id: 17935,
    size: 8,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 375,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:53.171",
    allowed_on_road: true,
    allows_heavy_waste: true,
  },
  {
    id: 17936,
    size: 10,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 400,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:53.339",
    allowed_on_road: false,
    allows_heavy_waste: false,
  },
  {
    id: 17937,
    size: 12,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 439,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:53.516",
    allowed_on_road: false,
    allows_heavy_waste: false,
  },
  {
    id: 17938,
    size: 14,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 470,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:53.69",
    allowed_on_road: false,
    allows_heavy_waste: false,
  },
  {
    id: 17939,
    size: 16,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 496,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:53.876",
    allowed_on_road: false,
    allows_heavy_waste: false,
  },
  {
    id: 15124,
    size: 20,
    hire_period_days: 14,
    transport_cost: 248,
    per_tonne_cost: 248,
    price_before_vat: 992,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:40.344435",
    updated_at: "2025-04-07T13:16:52.434",
    allowed_on_road: false,
    allows_heavy_waste: true,
  },
  {
    id: 15125,
    size: 40,
    hire_period_days: 14,
    transport_cost: 248,
    per_tonne_cost: 248,
    price_before_vat: 992,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:40.344435",
    updated_at: "2025-04-07T13:16:52.603",
    allowed_on_road: false,
    allows_heavy_waste: false,
  },
];

// Display properties mapping based on skip size
const getDisplayProperties = (apiData: SkipApiData) => {
  const size = apiData.size;

  // Size-based properties
  const sizeConfig = {
    4: {
      name: "Compact",
      scale: 1.2,
      popularity: 0.15,
      icon: Home,
      gradient: "from-emerald-400 via-green-500 to-teal-600",
      description: "Perfect for small home projects and garden clearances",
      capacity: "30-40 bin bags",
      dimensions: "4ft × 6ft × 3ft",
      weight: "2-3 tonnes",
      bestFor: [
        "Garden waste",
        "Small renovations",
        "Decluttering",
        "DIY projects",
      ],
      useCases: [
        { type: "Garden clearance", percentage: 85 },
        { type: "Small renovation", percentage: 70 },
        { type: "Decluttering", percentage: 90 },
      ],
    },
    6: {
      name: "Standard",
      scale: 1.2,
      popularity: 0.35,
      icon: Home,
      gradient: "from-blue-400 via-sky-500 to-indigo-600",
      description: "Most popular choice for home renovations",
      capacity: "50-60 bin bags",
      dimensions: "6ft × 8ft × 4ft",
      weight: "3-4 tonnes",
      bestFor: [
        "Kitchen renovations",
        "Bathroom refits",
        "Medium clear-outs",
        "House moves",
      ],
      useCases: [
        { type: "Kitchen renovation", percentage: 95 },
        { type: "Bathroom refit", percentage: 90 },
        { type: "House move", percentage: 75 },
      ],
      badge: "Most Popular",
    },
    8: {
      name: "Large",
      scale: 1.2,
      popularity: 0.25,
      icon: Building,
      gradient: "from-rose-400 via-pink-500 to-fuchsia-600",
      description: "Ideal for larger home projects and extensions",
      capacity: "70-80 bin bags",
      dimensions: "8ft × 10ft × 4.5ft",
      weight: "4-5 tonnes",
      bestFor: [
        "Full room renovations",
        "Extensions",
        "Large garden projects",
        "Commercial fit-outs",
      ],
      useCases: [
        { type: "Full renovation", percentage: 90 },
        { type: "Extension work", percentage: 85 },
        { type: "Commercial project", percentage: 70 },
      ],
    },
    10: {
      name: "Extra Large",
      scale: 1.2,
      popularity: 0.2,
      icon: Building,
      gradient: "from-violet-400 via-purple-500 to-indigo-700",
      description: "Perfect for major home projects and large clearouts",
      capacity: "90-100 bin bags",
      dimensions: "10ft × 12ft × 5ft",
      weight: "5-6 tonnes",
      bestFor: [
        "Major renovations",
        "Large extensions",
        "Commercial projects",
        "Construction waste",
      ],
      useCases: [
        { type: "Major renovation", percentage: 95 },
        { type: "Large extension", percentage: 85 },
        { type: "Construction", percentage: 80 },
      ],
    },
    12: {
      name: "Commercial",
      scale: 1.2,
      popularity: 0.15,
      icon: Factory,
      gradient: "from-amber-400 via-orange-500 to-red-600",
      description: "Heavy-duty solution for major construction",
      capacity: "110-120 bin bags",
      dimensions: "12ft × 14ft × 5.5ft",
      weight: "6-8 tonnes",
      bestFor: [
        "Major construction",
        "Industrial projects",
        "Large demolitions",
        "Commercial builds",
      ],
      useCases: [
        { type: "Construction", percentage: 95 },
        { type: "Demolition", percentage: 90 },
        { type: "Industrial", percentage: 80 },
      ],
    },
  };

  // Default config for sizes not specifically mapped
  const defaultConfig = {
    name: `${size} Yard Skip`,
    scale: 1.2,
    popularity: 0.1,
    icon: size >= 16 ? Factory : size >= 10 ? Building : Home,
    gradient:
      size >= 40
        ? "from-slate-600 via-gray-700 to-zinc-800"
        : size >= 20
          ? "from-red-500 via-red-700 to-red-900"
          : size >= 16
            ? "from-cyan-400 via-teal-500 to-emerald-600"
            : size >= 14
              ? "from-indigo-400 via-blue-600 to-blue-900"
              : size >= 12
                ? "from-yellow-400 via-amber-500 to-orange-600"
                : "from-slate-400 via-gray-500 to-zinc-600",
    description:
      size >= 20
        ? "Industrial-grade solution for major projects"
        : size >= 16
          ? "Large commercial and construction projects"
          : size >= 12
            ? "Heavy-duty commercial applications"
            : `${size} yard skip for medium to large projects`,
    capacity: `${Math.round(size * 10)}-${Math.round(size * 12)} bin bags`,
    dimensions: `${Math.round(size * 1.2)}ft × ${Math.round(
      size * 1.5,
    )}ft × ${Math.round(size * 0.4 + 3)}ft`,
    weight: `${Math.round(size * 0.6)}-${Math.round(size * 0.8)} tonnes`,
    bestFor:
      size >= 20
        ? [
            "Industrial projects",
            "Major construction",
            "Large demolitions",
            "Commercial builds",
          ]
        : size >= 16
          ? [
              "Large construction",
              "Commercial projects",
              "Major demolitions",
              "Industrial work",
            ]
          : size >= 12
            ? [
                "Construction projects",
                "Commercial renovation",
                "Large clearouts",
                "Industrial use",
              ]
            : [
                "Medium construction",
                "Large renovation",
                "Commercial projects",
                "Bulk waste",
              ],
    useCases: [
      {
        type:
          size >= 20
            ? "Industrial"
            : size >= 16
              ? "Large construction"
              : size >= 12
                ? "Construction"
                : "Large project",
        percentage: 90,
      },
      {
        type:
          size >= 20
            ? "Major construction"
            : size >= 16
              ? "Commercial"
              : size >= 12
                ? "Commercial renovation"
                : "Commercial",
        percentage: 80,
      },
      { type: "Bulk clearance", percentage: 70 },
    ],
  };

  return sizeConfig[size as keyof typeof sizeConfig] || defaultConfig;
};

// Transform API data to enhanced Skip format
const transformApiDataToSkip = (apiData: SkipApiData): Skip => {
  const displayProps = getDisplayProperties(apiData);
  const priceWithVat = Math.round(
    apiData.price_before_vat * (1 + apiData.vat / 100),
  );
  const finalPrice = apiData.transport_cost
    ? priceWithVat + apiData.transport_cost
    : priceWithVat;

  // Generate restrictions based on API data
  const restrictions: string[] = [];
  if (!apiData.allowed_on_road) {
    restrictions.push("Road permit required");
  }
  if (!apiData.allows_heavy_waste) {
    restrictions.push("Heavy waste restrictions apply");
  }
  if (apiData.transport_cost) {
    restrictions.push("Additional transport costs apply");
  }

  return {
    // API data
    ...apiData,

    // Computed properties
    final_price: finalPrice,
    price_with_vat: priceWithVat,

    // Display properties
    ...displayProps,
    restrictions,
    deliveryTime: apiData.transport_cost ? "Next day" : "Same day",
  };
};

// Export transformed data
export const skipData: Skip[] = rawApiData
  .filter((skip) => !skip.forbidden) // Filter out forbidden skips
  .map(transformApiDataToSkip)
  .sort((a, b) => a.size - b.size); // Sort by size

// Find the index of the most popular skip (highest popularity score)
export const getMostPopularSkipIndex = (): number => {
  let mostPopularIndex = 0;
  let highestPopularity = 0;

  skipData.forEach((skip, index) => {
    if (skip.popularity > highestPopularity) {
      highestPopularity = skip.popularity;
      mostPopularIndex = index;
    }
  });

  return mostPopularIndex;
};

// Find the index of a skip by size
export const getSkipIndexBySize = (size: number): number => {
  const index = skipData.findIndex((skip) => skip.size === size);
  return index !== -1 ? index : getMostPopularSkipIndex(); // Fallback to most popular if size not found
};

// Export utility functions
export { transformApiDataToSkip, rawApiData };
