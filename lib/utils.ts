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
