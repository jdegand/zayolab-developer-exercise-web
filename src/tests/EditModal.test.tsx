import { render, screen, fireEvent } from "@testing-library/react";
import EditModal from "../components/EditModal";
import Entry from "../models/Entry";

const mockData: Entry[] = [
  {
    id: "1",
    type: "revenues",
    name: "Item 1",
    oneTime: 100,
    monthly: 50,
  },
  {
    id: "2",
    type: "revenues",
    name: "Item 2",
    oneTime: 50,
    monthly: 25,
  },
  {
    id: "3",
    type: "revenues",
    name: "Item 3",
    oneTime: 25,
    monthly: 85,
  },
];

describe("EditModal", () => {
  test("Renders correctly", () => {
    const setRevenues = jest.fn();
    const setExpenses = jest.fn();
    const onHide = jest.fn();
    render(
      <EditModal
        item={undefined}
        data={[]}
        setRevenues={setRevenues}
        onHide={onHide}
        setExpenses={setExpenses}
        show={true}
      />
    );

    const change = screen.getByText(/change/i);
    expect(change).toBeInTheDocument();
  });

  test("setRevenues called if data.type === revenue", () => {
    const setExpenses = jest.fn();
    const setRevenues = jest.fn();
    const onHide = jest.fn();

    render(
      <EditModal
        item={{
          id: "1",
          type: "revenues",
          name: "Item 1",
          oneTime: 100,
          monthly: 50,
        }}
        data={mockData}
        setRevenues={setRevenues}
        onHide={onHide}
        setExpenses={setExpenses}
        show={true}
      />
    );

    expect(screen.getByLabelText(/type/i)).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "a" },
    });
    fireEvent.change(screen.getByLabelText(/One-Time/i), {
      target: { value: "100" },
    });

    fireEvent.click(screen.getByTestId("edit-save-button"));

    expect(setRevenues).toBeCalled();
  });

  test("setExpenses called if data.type === expenses", () => {
    const setExpenses = jest.fn();
    const setRevenues = jest.fn();
    const onHide = jest.fn();

    render(
      <EditModal
        item={{
          id: "1",
          type: "expenses",
          name: "Item 1",
          oneTime: 100,
          monthly: 50,
        }}
        data={mockData}
        setRevenues={setRevenues}
        onHide={onHide}
        setExpenses={setExpenses}
        show={true}
      />
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "a" },
    });

    expect(screen.getByDisplayValue("a")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/One-Time/i), {
      target: { value: "100" },
    });

    expect(screen.getByDisplayValue("100")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/monthly/i), {
      target: { value: "150" },
    });

    expect(screen.getByDisplayValue("150")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("edit-save-button"));

    expect(setExpenses).toBeCalled();
  });

  test("cancel button causes onHide to be called", () => {
    const setExpenses = jest.fn();
    const setRevenues = jest.fn();
    const onHide = jest.fn();

    render(
      <EditModal
        item={{
          id: "1",
          type: "expenses",
          name: "Item 1",
          oneTime: 100,
          monthly: 50,
        }}
        data={mockData}
        setRevenues={setRevenues}
        onHide={onHide}
        setExpenses={setExpenses}
        show={true}
      />
    );

    fireEvent.click(screen.getByTestId("edit-cancel-button"));

    expect(onHide).toBeCalled();
  });
});
