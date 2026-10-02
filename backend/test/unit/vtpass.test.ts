import { guessNetwork, toLocalNigerianMobile } from "../../src/constants/vtpass";
import { generateRequestId, interpret } from "../../src/services/vtpass.service";

describe("VTpass helpers", () => {
  it("normalises Nigerian mobile numbers to the 11-digit local form", () => {
    expect(toLocalNigerianMobile("+234 803 123 4567")).toBe("08031234567");
    expect(toLocalNigerianMobile("2348031234567")).toBe("08031234567");
    expect(toLocalNigerianMobile("803-123-4567")).toBe("08031234567");
    expect(toLocalNigerianMobile("0803 123 4567")).toBe("08031234567");
    expect(toLocalNigerianMobile("+44 7508 823495")).toBeNull();
    expect(toLocalNigerianMobile("0803")).toBeNull();
  });

  it("guesses the network from the prefix, or admits it doesn't know", () => {
    expect(guessNetwork("08031234567")).toBe("mtn");
    expect(guessNetwork("08021234567")).toBe("airtel");
    expect(guessNetwork("08051234567")).toBe("glo");
    expect(guessNetwork("08091234567")).toBe("etisalat");
    expect(guessNetwork("08011111111")).toBeNull();
  });

  it("starts the request id with the Lagos date and time (UTC+1)", () => {
    expect(generateRequestId(new Date("2026-10-02T23:30:00Z")).slice(0, 12)).toBe("202610030030");
  });

  it("treats only clear answers as delivered or failed", () => {
    expect(interpret({ code: "000", content: { transactions: { status: "delivered" } } }).outcome).toBe("delivered");
    expect(interpret({ code: "000", content: { transactions: { status: "pending" } } }).outcome).toBe("pending");
    expect(interpret({ code: "000", content: { transactions: { status: "reversed" } } }).outcome).toBe("failed");
    expect(interpret({ code: "099" }).outcome).toBe("pending");
    expect(interpret({ code: "016" }).outcome).toBe("failed");
    expect(interpret({ code: "999" }).outcome).toBe("pending");
    expect(interpret(null).outcome).toBe("pending");
  });
});
