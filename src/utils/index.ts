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
