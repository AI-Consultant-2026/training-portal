import { calculateCommission, SaleFacts } from "../../src/services/salesRep.service";

// Commission rules from the Independent Sales Representative Agreement, section 4.

const DAY = 24 * 60 * 60 * 1000;
const NOW = new Date("2026-11-20T12:00:00Z");
const rep = { email: "rep@example.com", endedAt: null as string | null };

let n = 0;
function sale(overrides: Partial<SaleFacts> = {}): SaleFacts {
  n += 1;
  const paid = new Date(NOW.getTime() - 10 * DAY);
  return {
    enrollmentId: `e${n}`,
    studentId: `s${n}`,
    studentName: `Student ${n}`,
    studentEmail: `student${n}@example.com`,
    courseTitle: "Cyber Security Fundamentals",
    courseSlug: "cyber-security-fundamentals",
    registeredAt: new Date(paid.getTime() - DAY),
    enrolledDate: paid,
    paymentConfirmed: true,
    paymentConfirmedAt: paid,
    depositPaidAt: null,
    refundedAt: null,
    ...overrides,
  };
}

describe("calculateCommission", () => {
  it("pays 10% of the course fee once the 7-day refund window has passed", () => {
    const { sales, months } = calculateCommission(rep, [sale(), sale({ courseSlug: "hse-fundamentals" })], NOW);
    expect(sales.map((s) => [s.state, s.commissionNgn])).toEqual([
      ["qualified", 20_000],
      ["qualified", 10_000],
    ]);
    expect(months).toEqual([{ month: "2026-11", qualifiedSales: 2, commissionNgn: 30_000, bonusNgn: 0 }]);
  });

  it("waits for full payment and for the refund window, and pays nothing on refunds or own sales", () => {
    const { sales } = calculateCommission(
      rep,
      [
        sale({ paymentConfirmed: false, paymentConfirmedAt: null, depositPaidAt: new Date(NOW.getTime() - 20 * DAY) }),
        sale({ paymentConfirmedAt: new Date(NOW.getTime() - 3 * DAY) }),
        sale({ refundedAt: new Date(NOW.getTime() - DAY) }),
        sale({ studentEmail: "Rep@Example.com" }),
        sale({ paymentConfirmed: false, paymentConfirmedAt: null }),
      ],
      NOW,
    );
    expect(sales.map((s) => [s.state, s.commissionNgn])).toEqual([
      ["deposit_only", 0],
      ["refund_window", 0],
      ["refunded", 0],
      ["own_account", 0],
      ["not_paid", 0],
    ]);
  });

  it("counts the window from the deposit, so a balance paid later qualifies at once", () => {
    const deposit = new Date(NOW.getTime() - 30 * DAY);
    const balance = new Date(NOW.getTime() - 2 * DAY);
    const [s] = calculateCommission(rep, [sale({ depositPaidAt: deposit, paymentConfirmedAt: balance })], NOW).sales;
    expect(s.state).toBe("qualified");
    expect(s.qualifiesAt).toBe(balance.toISOString());
  });

  it("adds the ₦30,000 bonus at 10 sales and pays 12.5% from the 16th sale in a month", () => {
    const facts = Array.from({ length: 16 }, (_, i) =>
      sale({ paymentConfirmedAt: new Date(Date.UTC(2026, 10, 1, 9) - 7 * DAY + i * 60_000) }),
    );
    const { sales, months } = calculateCommission(rep, facts, NOW);
    expect(sales.filter((s) => s.ratePercent === 12.5)).toHaveLength(1);
    expect(sales[15].commissionNgn).toBe(25_000);
    expect(months).toEqual([{ month: "2026-11", qualifiedSales: 16, commissionNgn: 15 * 20_000 + 25_000, bonusNgn: 30_000 }]);
  });

  it("counts months in Nigeria time", () => {
    // 23:30 UTC on 31 October is 00:30 on 1 November in Lagos.
    const [s] = calculateCommission(rep, [sale({ paymentConfirmedAt: new Date("2026-10-24T23:30:00Z") })], NOW).sales;
    expect(s.month).toBe("2026-11");
  });

  it("stops counting sales that qualify more than 30 days after the agreement ends", () => {
    const ended = { ...rep, endedAt: "2026-10-01" };
    const { sales } = calculateCommission(
      ended,
      [
        sale({ paymentConfirmedAt: new Date("2026-10-20T10:00:00Z") }),
        sale({ paymentConfirmedAt: new Date("2026-10-30T10:00:00Z") }),
      ],
      NOW,
    );
    expect(sales.map((s) => s.state)).toEqual(["qualified", "after_agreement"]);
  });
});
