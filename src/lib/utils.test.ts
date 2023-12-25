import { formatIsoDate } from "./utils";

describe("formatIsoDate", () => {
  it("should format ISO date correctly", () => {
    const isoDate = "2022-01-01T12:34:56Z";
    const formattedDate = formatIsoDate(isoDate);
    expect(formattedDate).toBe("1/1/2022, 8:34:56 PM");
  });

  it("should handle invalid ISO date", () => {
    const isoDate = "invalid-date";
    const formattedDate = formatIsoDate(isoDate);
    expect(formattedDate).toBe("Invalid Date");
  });
});
