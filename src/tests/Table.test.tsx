import React from "react";
import { render, screen } from "@testing-library/react";
import Table from "../components/Table";
import Entry from "../models/Entry";

const mockData = [
  {
    id: "44",
    name: "Mock Name",
    type: "revenue",
    oneTime: 200,
    monthly: 10,
  },
];

describe("Table", () => {
  test("Renders correctly", () => {
    render(
      <Table
        data={mockData}
        type={""}
        handleDelete={function (
          arg0: React.MouseEvent<any, MouseEvent>,
          arg1: any,
          arg2: any
        ): void {
          throw new Error("Function not implemented.");
        }}
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
  test("No entries", () => {
    render(
      <Table
        data={[]}
        type={""}
        handleDelete={function (
          arg0: React.MouseEvent<any, MouseEvent>,
          arg1: any,
          arg2: any
        ): void {
          throw new Error("Function not implemented.");
        }}
        setExpenses={function (arg0: Entry[]): void {
          throw new Error("Function not implemented.");
        }}
        setRevenues={function (arg0: Entry[]): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    const error = screen.getByText(/No entries/i);
    expect(error).toBeInTheDocument();
  });
});
