import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    currency: "INR",
  }).format(price);
}

export const textLimiter = (text: string, wordLimit: number) => {
  let limitedText = text;

  const words = text.split(" ");

  if (words.length > wordLimit) {
    const limited = words.slice(0, wordLimit).join(" ") + "...";
    limitedText = limited;
  }
  return limitedText;
};

export const generateYears = (): string[] => {
  const currentYear = new Date().getFullYear();
  const startYear = 1999;
  const yearArray = [];

  for (let year = startYear; year <= currentYear; year++) {
    yearArray.push(year.toString());
  }

  return yearArray;
};

export function convertMonthsToYears(totalMonths: number) {
  const years = Math.floor(totalMonths / 12); // Get the full years
  const months = totalMonths % 12; // Get the remaining months

  if (months === 0) {
    return `${years} year`;
  }

  return `${years} Year and ${months} months`;
}
