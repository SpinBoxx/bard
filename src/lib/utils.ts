import { constants } from "@/constants/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodSchema } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidFrenchAddress(address: string): boolean {
  return constants.frenchAddressRegex.test(address);
}

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface ParsedAddress {
  address: string;
  postalCode: string;
  city: string;
}

export function parseAddress(input: string): ParsedAddress {
  const match = input.match(/^(.+?)\s+(\d{5})\s+(.+)$/);
  if (!match) {
    return {
      address: "",
      postalCode: "",
      city: "",
    };
  }
  console.log(match);

  const [, address, postalCode, city] = match;
  return {
    address: address.trim(),
    postalCode,
    city: city.trim(),
  };
}

interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: string[];
}
export function validateSchema<T>(
  schema: ZodSchema<T>,
  input: unknown
): ValidationResult<T> {
  const result = schema.safeParse(input);

  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  } else {
    console.log(result.error);

    const errors = result.error.errors.map((e) => {
      console.log(e);

      return `${e.path.join(".")}: ${e.message}`;
    });
    return {
      success: false,
      errors,
    };
  }
}
