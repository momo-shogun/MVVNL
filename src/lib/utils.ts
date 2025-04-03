import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function that merges multiple class names and resolves Tailwind class conflicts
 * Compatible with NativeWind's class name approach
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
