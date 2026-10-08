import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine class names, merging Tailwind conflicts properly.
 *
 * Usage:
 *   cn("px-4 py-2", isActive && "bg-teal-500", "px-6")
 *   → "py-2 px-6 bg-teal-500"
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}