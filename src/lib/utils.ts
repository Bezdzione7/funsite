import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateMinesMultiplier(picks: number, mines: number, _betAmount: number): number {
  const totalTiles = 25;
  const safeTiles = totalTiles - mines;
  
  if (picks === 0 || safeTiles <= 0) return 1;
  
  let multiplier = 1;
  for (let i = 0; i < picks; i++) {
    const remainingSafe = safeTiles - i;
    const remainingTotal = totalTiles - i;
    if (remainingSafe <= 0 || remainingTotal <= 0) break;
    multiplier *= remainingTotal / remainingSafe;
  }
  
  return Math.max(1, multiplier);
}

export function formatValue(value: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

