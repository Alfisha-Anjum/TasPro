import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to format currency in Indian Rupee format
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

// Utility function to get card shadow classes
export function getCardShadow(isHover: boolean = false): string {
  return isHover 
    ? 'shadow-card-hover' 
    : 'shadow-card';
}

// Utility function to get button classes
export function getButtonClasses(type: 'primary' | 'outline' | 'secondary' = 'primary'): string {
  switch(type) {
    case 'primary':
      return 'bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300';
    case 'outline':
      return 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 rounded-lg font-medium';
    case 'secondary':
      return 'bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors duration-200 rounded-lg font-medium';
    default:
      return 'bg-primary text-primary-foreground hover:bg-primary/80 transition-colors duration-200 rounded-lg font-medium';
  }
}