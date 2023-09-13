export const convertProviderIdToName = (providerId: string): string => {
  if (providerId === "google.com") {
    return "Google";
  }
  if (providerId === "oidc.line") {
    return "LINE";
  }
  return providerId;
};

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const METADATA_TITLE = "Psyduck Next";
export const METADATA_DESCRIPTION =
  "Psyduck-next is a Next.js 13 boilerplate with firebase authentication and firestore, based on React, TypeScript, and Tailwind CSS.";
