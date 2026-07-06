/**
 * Gym Power Hub - Membership Types & Prices
 * Single source of truth for all membership logic
 */

export const MEMBERSHIP_TYPES = ["3 Months", "6 Months", "12 Months"] as const;
export type MembershipType = (typeof MEMBERSHIP_TYPES)[number];

// Price per plan (₹) - used for revenue calculation
export const MEMBERSHIP_PRICES: Record<string, number> = {
  "3 Months": 13999,
  "6 Months": 20999,
  "12 Months": 37999,
};

// Map invalid/alternate names to valid membership type
const TYPE_ALIASES: Record<string, MembershipType> = {
  "3 months": "3 Months",
  "6 months": "6 Months",
  "12 months": "12 Months",
  basic: "3 Months",
  premium: "6 Months",
  elite: "12 Months",
  "3 month": "3 Months",
  "6 month": "6 Months",
  "12 month": "12 Months",
  standard: "3 Months",
  gold: "6 Months",
  platinum: "12 Months",
};

/** Normalize any membership string to valid type */
export function normalizeMembershipType(input: string | null | undefined): MembershipType {
  if (!input || typeof input !== "string") return "3 Months";
  const trimmed = input.trim();
  if (MEMBERSHIP_TYPES.includes(trimmed as MembershipType)) return trimmed as MembershipType;
  const lower = trimmed.toLowerCase();
  return TYPE_ALIASES[lower] ?? "3 Months";
}

/** Get price for membership type */
export function getMembershipPrice(type: string | null | undefined): number {
  const normalized = normalizeMembershipType(type);
  return MEMBERSHIP_PRICES[normalized] ?? MEMBERSHIP_PRICES["3 Months"];
}

/** Format price for display */
export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

/** Plans for Membership page display */
export const MEMBERSHIP_PLANS = [
  { name: "3 Months", price: 13999, priceFormatted: "13,999", couplePrice: "23,999", groupPrice: undefined, description: "Short-term commitment to kickstart your fitness", popular: false },
  { name: "6 Months", price: 20999, priceFormatted: "20,999", couplePrice: "34,999", groupPrice: "54,999", description: "Best value for committed fitness enthusiasts", popular: true },
  { name: "12 Months", price: 37999, priceFormatted: "37,999", couplePrice: "49,999", groupPrice: "95,999", description: "Ultimate annual package with maximum benefits", popular: false },
] as const;
