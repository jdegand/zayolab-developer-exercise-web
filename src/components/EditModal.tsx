import { Row, Col, Button, Form, Modal } from "react-bootstrap";
import React, { useState } from "react";
import Entry from "../models/Entry";

// problem with typing onHide

function EditModal(props: {
  item: any;
  data: Entry[];
  setRevenues: (arg0: Entry[]) => void;
  onHide: any;
  setExpenses: (arg0: Entry[]) => void;
  show: boolean | undefined;
}) {
  const [editedEntry, setEditedEntry] = useState({
    ...props.item,
  });

  const handleEditedEntryChange = (event: React.BaseSyntheticEvent) => {
    setEditedEntry((prevData: any) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleEdit = (editedEntry: any) => {
    if (editedEntry.type === "revenues") {
      const updatedArray = props.data.map((item: any) => {
        if (item.id === editedEntry.id) {
          return {
            id: item.id,
            type: editedEntry.type,
            name: editedEntry.name,
            oneTime: Number(editedEntry.oneTime),
            monthly: Number(editedEntry.monthly),
          };
        } else {
          return item;
        }
      });
      props.setRevenues(updatedArray);
      props.onHide();
    } else {
      const updatedArray = props.data.map((item: any) => {
        if (item.id === editedEntry.id) {
          return {
            id: item.id,
            type: editedEntry.type,
            name: editedEntry.name,
            oneTime: Number(editedEntry.oneTime),
            monthly: Number(editedEntry.monthly),
          };
        } else {
          return item;
        }
      });
      props.setExpenses(updatedArray);
      props.onHide();
    }
  };

  // Modal {...props} in example from react bootstrap docs - react errors

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change {editedEntry.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="addExpenseOrRevenueForm">
          <Row className="input-field align-items-end">
            <Col sm={{ span: 2, offset: 1 }} className="input-field">
              <Form.Group>
                <Form.Label htmlFor="edit-type">Type</Form.Label>
                <Form.Control
                  id="edit-type"
                  as="select"
                  name="type"
                  value={editedEntry.type}
                  onChange={(event) => handleEditedEntryChange(event)}
                  disabled
                  readOnly
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
                <Form.Label htmlFor="edit-name">Name</Form.Label>
                <Form.Control
                  id="edit-name"
                  type="text"
                  name="name"
                  placeholder={editedEntry.name}
                  value={editedEntry.name}
                  onChange={(event) => handleEditedEntryChange(event)}
                />
              </Form.Group>
            </Col>
            <Col sm={2} className="input-field">
              <Form.Group>
                <Form.Label htmlFor="edit-oneTime">One-Time</Form.Label>
                <Form.Control
                  id="edit-oneTime"
                  type="number"
                  name="oneTime"
                  placeholder={editedEntry.oneTime}
                  step="0.01"
                  min="0"
                  value={editedEntry.oneTime}
                  onChange={(event) => handleEditedEntryChange(event)}
                />
              </Form.Group>
            </Col>
            <Col sm={2} className="input-field">
              <Form.Group>
                <Form.Label htmlFor="edit-monthly">Monthly</Form.Label>
                <Form.Control
                  id="edit-monthly"
                  type="number"
                  name="monthly"
                  placeholder={editedEntry.monthly}
                  step="0.01"
                  min="0"
                  value={editedEntry.monthly}
                  onChange={(event) => handleEditedEntryChange(event)}
                />
              </Form.Group>
            </Col>
            <Col sm={1} className="add-form-button">
              <Button
                data-testid="edit-save-button"
                type="button"
                onClick={() => handleEdit(editedEntry)}
              >
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          data-testid="edit-cancel-button"
          variant="light"
          onClick={props.onHide}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditModal;
