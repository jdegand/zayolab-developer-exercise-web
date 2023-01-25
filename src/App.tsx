import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Table from "./components/Table";
import TotalsTable from "./components/TotalsTable";
import AddForm from "./components/AddForm";
import TermSelect from "./components/TermSelect";
import Entry from "./models/Entry";
import NewEntry from "./models/NewEntry";
import "./App.css";

const seedRevenueData: Entry[] = [
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

const seedExpenseData: Entry[] = [
  {
    id: "4",
    type: "expenses",
    name: "Expense 1",
    oneTime: 500,
    monthly: 20.0,
  },
  {
    id: "5",
    type: "expenses",
    name: "Expense 2",
    oneTime: 200,
    monthly: 40,
  },
];

function App() {
  const [revenues, setRevenues] = useState<Entry[]>(seedRevenueData);

  const [expenses, setExpenses] = useState<Entry[]>(seedExpenseData);

  const [termLength, setTermLength] = useState<number>(12);

  const [newEntry, setNewEntry] = useState<NewEntry>({
    id: "",
    type: "revenues",
    name: "",
    oneTime: "",
    monthly: "",
  });

  const handleNewEntryChange = (event: React.BaseSyntheticEvent) => {
    setNewEntry((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAdd = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();

    if (newEntry.type === "revenues") {
      setRevenues([
        ...revenues,
        {
          id: crypto.randomUUID(),
          type: newEntry.type,
          name: newEntry.name,
          oneTime: Number(newEntry.oneTime),
          monthly: Number(newEntry.monthly),
        },
      ]);
      setNewEntry({
        id: "",
        type: "revenues",
        name: "",
        oneTime: "",
        monthly: "",
      });
    } else {
      setExpenses([
        ...expenses,
        {
          id: crypto.randomUUID(),
          type: newEntry.type,
          name: newEntry.name,
          oneTime: Number(newEntry.oneTime),
          monthly: Number(newEntry.monthly),
        },
      ]);
      setNewEntry({
        id: "",
        type: "expenses",
        name: "",
        oneTime: "",
        monthly: "",
      });
    }
  };

  const handleDelete = (
    event: React.BaseSyntheticEvent,
    id: string,
    type: string
  ) => {
    event.preventDefault();
    if (type === "revenues") {
      setRevenues(revenues.filter((item) => item.id !== id));
    }
    setExpenses(expenses.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setRevenues([]);
    setExpenses([]);
  };

  const handleTermLength = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    setTermLength(event.target.value);
  };

  return (
    <div>
      <header>
        <h1>ROI Calculator</h1>
        <div className="d-flex align-items-end">
          <TermSelect
            termLength={termLength}
            handleTermLength={handleTermLength}
          />
          <Button
            data-testid="app-clear-all-button"
            type="button"
            variant="danger"
            className="ms-3"
            onClick={handleClearAll}
          >
            Clear All
          </Button>
        </div>
      </header>
      <AddForm
        handleAdd={handleAdd}
        handleNewEntryChange={handleNewEntryChange}
        newEntry={newEntry}
      />
      <div className="roi-tables">
        <Table
          type="Revenue"
          data={revenues}
          setRevenues={setRevenues}
          setExpenses={setExpenses}
          handleDelete={handleDelete}
        />
        <Table
          type="Expenses"
          data={expenses}
          setRevenues={setRevenues}
          setExpenses={setExpenses}
          handleDelete={handleDelete}
        />
        <TotalsTable
          termLength={termLength}
          revenues={revenues}
          expenses={expenses}
        />
      </div>
    </div>
  );
}

export default App;
