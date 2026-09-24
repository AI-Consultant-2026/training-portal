import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import * as coursesApi from "../../api/courses.api";
import * as enrollmentsApi from "../../api/enrollments.api";
import * as paymentsApi from "../../api/payments.api";
import { renderWithProviders } from "../../test/test-utils";
import { Course, PaymentQuote, User } from "../../types/api";
import { BankTransferPage } from "./BankTransferPage";

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
  location: "Nigeria",
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

function quote(sortCodeOrIban: string): PaymentQuote {
  return {
    baseAmountNgn: 200000,
    card: { currency: "GBP", amount: 100 },
    bankTransfer: {
      currency: "NGN",
      amount: 200000,
      enabled: true,
      bankDetails: {
        bankName: "Test Bank",
        accountName: "Paleon Training Limited",
        accountNumber: "0123456789",
        sortCodeOrIban,
      },
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
      <Route path="/courses/:slug/pay/bank-transfer" element={<BankTransferPage />} />
    </Routes>,
    {
      route: `/courses/${COURSE.slug}/pay/bank-transfer`,
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

describe("BankTransferPage", () => {
  it("shows the amount and bank details, including the sort code when one is set", async () => {
    renderPage(quote("044150149"));

    expect(await screen.findByText("Amount to transfer: ₦200,000")).toBeInTheDocument();
    expect(screen.getByText("Test Bank")).toBeInTheDocument();
    expect(screen.getByText("0123456789")).toBeInTheDocument();
    expect(screen.getByText("Sort code")).toBeInTheDocument();
    expect(screen.getByText("044150149")).toBeInTheDocument();
  });

  it("hides the sort-code row when none is configured", async () => {
    renderPage(quote(""));

    expect(await screen.findByText("Test Bank")).toBeInTheDocument();
    expect(screen.queryByText("Sort code")).not.toBeInTheDocument();
  });

  it("shows the temporary-account notice above the bank details", async () => {
    renderPage(quote(""));

    expect(await screen.findByText("Temporary payment arrangement")).toBeInTheDocument();
    expect(screen.getByText(/finalising Paleon Training.s Nigerian business bank account/)).toBeInTheDocument();
    expect(screen.getByText(/use your name \+ course name as the payment reference/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "enrolment@paleontraining.com" })).toHaveAttribute(
      "href",
      "mailto:enrolment@paleontraining.com",
    );
  });

  it("shows a 'temporarily unavailable' notice, with no account details or form, while bank transfers are paused", async () => {
    const paused = quote("044150149");
    paused.bankTransfer.enabled = false;
    paused.bankTransfer.bankDetails = { bankName: "", accountName: "", accountNumber: "", sortCodeOrIban: "" };
    renderPage(paused);

    expect(await screen.findByText("Bank transfer is temporarily unavailable")).toBeInTheDocument();
    expect(screen.getByText(/hello@paleontraining\.com/)).toBeInTheDocument();
    expect(screen.queryByText(/Amount to transfer/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Transaction reference/)).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /I've made this transfer/ })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Back to course" })).toBeInTheDocument();
  });
});
