import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const providerIdToName = (providerId: string): string => {
  if (providerId === "google.com") {
    return "Google";
  }
  if (providerId === "oidc.line") {
    return "LINE";
  }
  return providerId;
};

export function formatIsoDate(isoDate: string) {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Taipei",
  };
  return date.toLocaleDateString("en-US", options);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
