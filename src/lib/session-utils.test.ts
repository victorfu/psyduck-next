jest.mock("@/lib/firebase-admin-helper", () => ({
  verifySessionCookieAndGetUser: jest.fn(),
}));

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
  headers: jest.fn().mockReturnValue({
    get: jest.fn().mockReturnValue(
      JSON.stringify({
        uid: "1234567890",
        email: "abc@abc.com",
      }),
    ),
  }),
}));

import { getUserFromHeader } from "@/lib/session-utils";

describe("getUserFromHeader", () => {
  it("should return the parsed user object when user header is valid", () => {
    const result = getUserFromHeader();
    if (!result) {
      throw new Error("result is undefined");
    }
    expect(result.uid).toEqual("1234567890");
    expect(result.email).toEqual("abc@abc.com");
  });
});
