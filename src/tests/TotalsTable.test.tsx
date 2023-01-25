import { render, screen } from "@testing-library/react";
import TotalsTable from "../components/TotalsTable";
import Entry from "../models/Entry";

const revenues: Entry[] = [
  {
    id: "44",
    name: "Mock Name",
    type: "revenue",
    oneTime: 200,
    monthly: 10,
  },
];

const expenses: Entry[] = [
  {
    id: "44",
    name: "Mock Name",
    type: "revenue",
    oneTime: 100,
    monthly: 0,
  },
];

describe("TotalsTable", () => {
  test("Renders correctly", () => {
    render(
      <TotalsTable revenues={revenues} expenses={expenses} termLength={12} />
    );
    const result = screen.getByTestId("totalContributionProfit");
    expect(result.textContent).toEqual("$ 220.00");
    const result2 = screen.getByTestId("contributionMargin");
    expect(result2.textContent).toEqual("69%");
    const result3 = screen.getByTestId("capital-roi");
    expect(result3.classList).toContain("error");
  });

  test("TermLength", () => {
    render(
      <TotalsTable revenues={revenues} expenses={expenses} termLength={24} />
    );
    const result = screen.getByTestId("totalContributionProfit");
    expect(result.textContent).toEqual("$ 340.00");
  });
});
