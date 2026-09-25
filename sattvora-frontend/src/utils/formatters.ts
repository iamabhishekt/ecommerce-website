/**
 * Formatting and calculation utilities for Sattvora Ecommerce
 */

/**
 * Format number into Indian Rupee currency format (e.g. ₹1,499)
 */
export function formatCurrency(amount: number): string {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`
}

export const fmt = formatCurrency

/**
 * Calculate discount percentage between MRP and selling price
 */
export function calculateDiscount(mrp: number, sellingPrice: number): number {
  if (mrp <= 0) return 0
  return Math.round(((mrp - sellingPrice) / mrp) * 100)
}

export const discount = calculateDiscount

/**
 * Calculate profit margin percentage based on cost price and selling price
 */
export function calculateMargin(
  costPrice: number,
  sellingPrice: number,
): number {
  if (costPrice <= 0) return 0
  return Number((((sellingPrice - costPrice) / costPrice) * 100).toFixed(1))
}
