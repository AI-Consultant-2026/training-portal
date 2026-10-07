import { interpret } from "../../src/services/vtung.service";

describe("VTU.ng interpret", () => {
  it("only treats completed orders as delivered", () => {
    expect(interpret({ code: "success", data: { status: "completed-api", order_id: 1 } })).toMatchObject({
      outcome: "delivered",
      transactionId: "1",
    });
    expect(interpret({ code: "success", data: { status: "processing-api" } }).outcome).toBe("pending");
    expect(interpret({ code: "success", data: { status: "queued-api" } }).outcome).toBe("pending");
    expect(interpret({ code: "success", data: { status: "on-hold" } }).outcome).toBe("pending");
  });

  it("treats refunded, failed and cancelled orders as failed", () => {
    for (const status of ["refunded", "failed", "cancelled"]) {
      expect(interpret({ code: "success", data: { status } }).outcome).toBe("failed");
    }
  });

  it("fails only on errors where no order was placed", () => {
    expect(interpret({ code: "insufficient_funds" }).outcome).toBe("failed");
    expect(interpret({ code: "invalid_service" }).outcome).toBe("failed");
    expect(interpret({ code: "order_not_found" }).outcome).toBe("failed");
    expect(interpret({ code: "duplicate_request_id" }).outcome).toBe("pending");
    expect(interpret({ code: "something_new" }).outcome).toBe("pending");
    expect(interpret(null).outcome).toBe("pending");
  });
});
