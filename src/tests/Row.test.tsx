import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Row from "../components/Row";
import Entry from "../models/Entry";

const mockItem = {
  id: "44",
  name: "Mock Name",
  type: "revenue",
  oneTime: 200,
  monthly: 10,
};

describe("Row", () => {
  test("Renders correctly", () => {
    render(
      <Row
        item={mockItem}
        handleDelete={function (
          arg0: React.MouseEvent<any>,
          arg1: any,
          arg2: any
        ): void {
          throw new Error("Function not implemented.");
        }}
        data={[]}
        setExpenses={function (arg0: Entry[]): void {
          throw new Error("Function not implemented.");
        }}
        setRevenues={function (arg0: Entry[]): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    const name = screen.getByText("Mock Name");
    expect(name).toBeInTheDocument();
  });

  test("Row handlers", () => {
    const handleDelete = jest.fn();
    const setExpenses = jest.fn();
    const setRevenues = jest.fn();

    render(
      <Row
        item={mockItem}
        handleDelete={handleDelete}
        data={[mockItem]}
        setExpenses={setExpenses}
        setRevenues={setRevenues}
      />
    );

    fireEvent.click(screen.getByTestId("row-edit-button"));
    expect(screen.getByText(/change/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("row-delete-button"));
    expect(handleDelete).toBeCalledTimes(1);
  });
});
