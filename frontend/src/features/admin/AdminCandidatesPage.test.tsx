import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as adminApi from "../../api/admin.api";
import * as coursesApi from "../../api/courses.api";
import { renderWithProviders } from "../../test/test-utils";
import { Candidate } from "../../types/api";
import { AdminCandidatesPage } from "./AdminCandidatesPage";

vi.mock("../../api/admin.api");
vi.mock("../../api/courses.api");

function candidate(id: string, firstName: string, country: string, location: string): Candidate {
  return {
    id,
    firstName,
    lastName: "Test",
    email: `${id}@example.com`,
    status: "active",
    location,
    country,
    courseInterest: null,
    createdAt: "2026-10-30T10:00:00.000Z",
    online: false,
    lastActiveAt: null,
    enrollments: [],
  };
}

describe("AdminCandidatesPage — country tags and filter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(coursesApi.fetchCourses).mockResolvedValue([]);
    vi.mocked(adminApi.fetchCandidates).mockResolvedValue([
      candidate("ng1", "Amara", "NG", "Delta"),
      candidate("ng2", "Chidi", "NG", "Lagos"),
      candidate("gh1", "Kofi", "GH", "Greater Accra"),
      candidate("ke1", "Wanjiru", "KE", "Nairobi"),
    ]);
  });

  it("tags every candidate with their country", async () => {
    renderWithProviders(<AdminCandidatesPage />);
    const kofiRow = (await screen.findByText(/Kofi/)).closest("tr")!;
    expect(within(kofiRow).getByTitle("Ghana")).toHaveTextContent("GH");
    const amaraRow = screen.getByText(/Amara/).closest("tr")!;
    expect(within(amaraRow).getByTitle("Nigeria")).toHaveTextContent("NG");
  });

  it("filters by country, with a count for each of the four", async () => {
    const user = userEvent.setup();
    renderWithProviders(<AdminCandidatesPage />);
    await screen.findByText(/Kofi/);
    const filter = screen.getByRole("combobox", { name: "Filter candidates by country" });
    expect(within(filter).getByRole("option", { name: "All countries (4)" })).toBeInTheDocument();
    expect(within(filter).getByRole("option", { name: "Nigeria (2)" })).toBeInTheDocument();
    expect(within(filter).getByRole("option", { name: "South Africa (0)" })).toBeInTheDocument();

    await user.selectOptions(filter, "KE");
    expect(screen.getByText(/Wanjiru/)).toBeInTheDocument();
    expect(screen.queryByText(/Kofi/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Amara/)).not.toBeInTheDocument();

    await user.selectOptions(filter, "ZA");
    expect(screen.getByText("No candidates from South Africa yet.")).toBeInTheDocument();
  });
});
