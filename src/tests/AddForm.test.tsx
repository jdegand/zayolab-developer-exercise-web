import { fireEvent, render, screen } from "@testing-library/react";
import AddForm from "../components/AddForm";

describe("AddForm", () => {
  test("HandleAdd handlers are called", () => {
    const handleAdd = jest.fn();
    const handleNewEntryChange = jest.fn();

    render(
      <AddForm
        handleAdd={handleAdd}
        handleNewEntryChange={handleNewEntryChange}
        newEntry={{
          name: "",
          oneTime: "",
          monthly: "",
        }}
      />
    );

    fireEvent.change(screen.getByLabelText(/type/i), {
      target: { value: "expense" },
    });
    expect(handleNewEntryChange).toBeCalled();

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "a" },
    });
    expect(handleNewEntryChange).toBeCalled();

    fireEvent.change(screen.getByLabelText(/One-Time/i), {
      target: { value: "100" },
    });
    expect(handleNewEntryChange).toBeCalled();

    fireEvent.change(screen.getByLabelText(/monthly/i), {
      target: { value: "100" },
    });
    expect(handleNewEntryChange).toBeCalled();

    const save = screen.getByRole("button");
    fireEvent.click(save);
    expect(handleAdd).toBeCalledTimes(1);
  });
});
