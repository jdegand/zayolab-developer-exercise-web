import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders correctly", () => {
    render(<App />);
    const headerElement = screen.getByText(/ROI calculator/i);
    expect(headerElement).toBeInTheDocument();
  });

  test("Clear All button works", () => {
    render(<App />);
    const clearAll = screen.getByTestId("app-clear-all-button");
    fireEvent.click(clearAll);

    const noEntries = screen.getAllByText(/no entries/i);

    expect(noEntries).toHaveLength(2);
  });
});
