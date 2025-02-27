import { constants } from "@/constants/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidFrenchAddress(address: string): boolean {
  return constants.frenchAddressRegex.test(address);
}
