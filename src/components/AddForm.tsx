import { FormEventHandler, ChangeEvent } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";

const AddForm = (props: {
  handleAdd: FormEventHandler<HTMLFormElement> | undefined;
  handleNewEntryChange: (
    arg0: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  newEntry: {
    name: string;
    oneTime: string | number;
    monthly: string | number;
  };
}) => {
  // difficult to disable button since adding empty id: '' to newEntry object and having 0 - falsy value - being allowed
  // for oneTime and monthly values - can't do a simple grabbing of the values and use .every() to check for falsy values

  // const objectValues = Object.values(props.newEntry); //.every(Boolean);
  // objectValues.shift();
  // console.log('canAdd', objectValues.every(Boolean));

  // Added required to name - some validation - can still add - 0 and 0 to revenues/expenses

  // leading zero problem if newEntry state is initialized with 0 vs an empty string

  return (
    <Form className="addExpenseOrRevenueForm" onSubmit={props.handleAdd}>
      <Row className="input-field align-items-end">
        <Col sm={{ span: 2, offset: 1 }} className="input-field">
          <Form.Group>
            <Form.Label htmlFor="type">Type</Form.Label>
            <Form.Control
              id="type"
              as="select"
              name="type"
              className="form-select"
              defaultValue="revenues"
              onChange={(event) => props.handleNewEntryChange(event)}
            >
              <option value="choose" disabled={true}>
                Select Type
              </option>
              <option value="revenues">Revenue</option>
              <option value="expenses">Expense</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col sm={3} className="input-field">
          <Form.Group>
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control
              id="name"
              type="text"
              name="name"
              value={props.newEntry.name}
              onChange={(event) => props.handleNewEntryChange(event)}
              required={true}
              maxLength={15}
            />
          </Form.Group>
        </Col>
        <Col sm={2} className="input-field">
          <Form.Group>
            <Form.Label htmlFor="number">One-Time</Form.Label>
            <Form.Control
              id="number"
              type="number"
              name="oneTime"
              step="0.01"
              min="0"
              placeholder="0"
              value={props.newEntry.oneTime}
              onChange={(event) => props.handleNewEntryChange(event)}
            />
          </Form.Group>
        </Col>
        <Col sm={2} className="input-field">
          <Form.Group>
            <Form.Label htmlFor="monthly">Monthly</Form.Label>
            <Form.Control
              id="monthly"
              type="number"
              name="monthly"
              step="0.01"
              min="0"
              placeholder="0"
              value={props.newEntry.monthly}
              onChange={(event) => props.handleNewEntryChange(event)}
            />
          </Form.Group>
        </Col>
        <Col sm={1} className="add-form-button">
          <Button type="submit">Add</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddForm;
