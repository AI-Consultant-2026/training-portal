import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  location: "Lagos",
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
    card: { currency: "NGN", amount: 100000, enabled: cardEnabled },
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
  it("shows an unavailable notice with a contact address while the course has no Paystack link", async () => {
    renderPage(quote(false));

    expect(await screen.findByText(/payment isn.t available for this course yet/i)).toBeInTheDocument();
    expect(screen.getByText("hello@paleontraining.com")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /with Paystack/i })).not.toBeInTheDocument();
  });

  it("shows the Naira price with no card fields of its own, and sends the student to Paystack", async () => {
    const assign = vi.fn();
    vi.stubGlobal("location", { ...window.location, assign });
    vi.mocked(paymentsApi.startCardPayment).mockResolvedValue({
      paymentLink: "https://paystack.com/pay/hse",
    } as Awaited<ReturnType<typeof paymentsApi.startCardPayment>>);
    renderPage(quote(true));

    const pay = await screen.findByRole("button", { name: /Pay \u20A6100,000 with Paystack/ });
    expect(screen.queryByLabelText(/card number/i)).not.toBeInTheDocument();
    expect(screen.getByText("student@example.com")).toBeInTheDocument();
    expect(screen.queryByText(/GBP/)).not.toBeInTheDocument();

    await userEvent.click(pay);

    await waitFor(() => expect(assign).toHaveBeenCalledWith("https://paystack.com/pay/hse"));
    expect(paymentsApi.startCardPayment).toHaveBeenCalledWith(COURSE.id);
    vi.unstubAllGlobals();
  });

  it("stays on the page and shows the error if the payment can't be started", async () => {
    vi.mocked(paymentsApi.startCardPayment).mockRejectedValue({
      response: { data: { error: { message: "Please verify your email before enrolling in a course" } } },
    });
    renderPage(quote(true));

    await userEvent.click(await screen.findByRole("button", { name: /with Paystack/i }));

    expect(await screen.findByText(/verify your email/i)).toBeInTheDocument();
  });
});
