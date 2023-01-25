import { ChangeEventHandler } from "react";

import { Form } from "react-bootstrap";

interface TermSelectProps {
  termLength: number;
  handleTermLength: ChangeEventHandler<any>;
}

const TermSelect = (props: TermSelectProps) => {
  return (
    <Form.Group>
      <Form.Label htmlFor="term">Months</Form.Label>
      <Form.Control
        id="type"
        as="select"
        name="type"
        className="form-select"
        value={props.termLength}
        onChange={props.handleTermLength}
      >
        <option value="choose" disabled={true}>
          Months
        </option>
        <option value="12">12</option>
        <option value="24">24</option>
        <option value="36">36</option>
        <option value="48">48</option>
        <option value="60">60</option>
      </Form.Control>
    </Form.Group>
  );
};

export default TermSelect;
