import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resolves project image asset paths or keys to public URLs
 */
export function getProjectImage(imgKey?: string): string | null {
  if (!imgKey) return null;
  if (imgKey === "atithi") return "/projects/atithi.jpg";
  if (imgKey === "crashrisk") return "/projects/crashrisk.jpg";
  if (imgKey === "itsm" || imgKey === "flowsync") return "/projects/itsm.jpg";
  if (imgKey.startsWith("http") || imgKey.startsWith("/")) return imgKey;
  return null;
}

