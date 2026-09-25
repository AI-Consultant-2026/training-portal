import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import * as coursesApi from "../../api/courses.api";
import * as enrollmentsApi from "../../api/enrollments.api";
import * as paymentsApi from "../../api/payments.api";
import { renderWithProviders } from "../../test/test-utils";
import { Course, PaymentQuote, User } from "../../types/api";
import { CardPaymentPage } from "./CardPaymentPage";

vi.mock("../../api/courses.api");
vi.mock("../../api/enrollments.api");
vi.mock("../../api/payments.api");

const STUDENT: User = {
  id: "student-1",
  email: "student@example.com",
  firstName: "Stu",
  lastName: "Dent",
  role: "student",
  status: "active",
  profileData: {},
  location: "United Kingdom",
  courseInterest: null,
  university: null,
  referralCode: null,
  emailVerifiedAt: "2026-01-01T00:00:00.000Z",
};

const COURSE = {
  id: "course-1",
  title: "HSE Fundamentals",
  slug: "hse-fundamentals",
  description: "",
  durationWeeks: 8,
  status: "published",
} as unknown as Course;

function quote(cardEnabled: boolean): PaymentQuote {
  return {
    baseAmountNgn: 100000,
    card: { currency: "GBP", amount: 50, enabled: cardEnabled },
    bankTransfer: {
      currency: "NGN",
      amount: 100000,
      enabled: true,
      bankDetails: { bankName: "Test Bank", accountName: "Paleon Training Limited", accountNumber: "0123456789", sortCodeOrIban: "" },
    },
    estimatedLocal: null,
  };
}

function renderPage(q: PaymentQuote) {
  vi.mocked(coursesApi.fetchCourseBySlug).mockResolvedValue(COURSE);
  vi.mocked(paymentsApi.fetchPaymentQuote).mockResolvedValue(q);
  vi.mocked(enrollmentsApi.fetchMyEnrollments).mockResolvedValue([]);
  return renderWithProviders(
    <Routes>
      <Route path="/courses/:slug/pay/card" element={<CardPaymentPage />} />
    </Routes>,
    {
      route: `/courses/${COURSE.slug}/pay/card`,
      preloadedState: {
        auth: {
          user: STUDENT,
          accessToken: "token",
          status: "idle",
          bootstrapped: true,
          error: null,
          passwordReset: { status: "idle", error: null },
          emailVerification: { status: "idle", error: null, resendStatus: "idle" },
        },
      },
    },
  );
}

describe("CardPaymentPage", () => {
  it("shows an unavailable notice and a bank-transfer route, with no card form, while card payments are off", async () => {
    renderPage(quote(false));

    expect(await screen.findByText(/card payments are temporarily unavailable/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /pay by bank transfer/i })).toBeInTheDocument();
    expect(screen.queryByLabelText(/card number/i)).not.toBeInTheDocument();
    expect(paymentsApi.payWithCard).not.toHaveBeenCalled();
  });

  it("shows the card form when card payments are enabled", async () => {
    renderPage(quote(true));

    expect(await screen.findByLabelText(/card number/i)).toBeInTheDocument();
    expect(screen.queryByText(/card payments are temporarily unavailable/i)).not.toBeInTheDocument();
  });
});
