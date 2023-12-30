import { formatIsoDate, providerIdToName } from "./utils";

describe("providerIdToName", () => {
  it("should return 'Google' for providerId 'google.com'", () => {
    const providerId = "google.com";
    const name = providerIdToName(providerId);
    expect(name).toBe("Google");
  });

  it("should return 'LINE' for providerId 'oidc.line'", () => {
    const providerId = "oidc.line";
    const name = providerIdToName(providerId);
    expect(name).toBe("LINE");
  });

  it("should return the same providerId for unknown providerId", () => {
    const providerId = "unknown-provider";
    const name = providerIdToName(providerId);
    expect(name).toBe(providerId);
  });
});

describe("formatIsoDate", () => {
  it("should format ISO date correctly", () => {
    const isoDate = "2022-01-01T12:34:56Z";
    const formattedDate = formatIsoDate(isoDate);
    expect(formattedDate).toBe("1/1/2022, 08:34:56 PM");
  });

  it("should handle invalid ISO date", () => {
    const isoDate = "invalid-date";
    const formattedDate = formatIsoDate(isoDate);
    expect(formattedDate).toBe("Invalid Date");
  });
});
