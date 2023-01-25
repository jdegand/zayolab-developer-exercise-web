import React, { useState } from "react";
import { Button } from "react-bootstrap";
import EditModal from "./EditModal";
import Entry from "../models/Entry";

const Row = (props: {
  item: {
    id: string;
    name: string;
    oneTime: number;
    monthly: number;
    type: string;
  };
  handleDelete: (arg0: React.MouseEvent<any>, arg1: any, arg2: any) => void;
  data: Entry[];
  setExpenses: (arg0: Entry[]) => void;
  setRevenues: (arg0: Entry[]) => void;
}) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <tr key={props.item.id}>
        <td>{props.item.name}</td>
        <td>$ {props.item.oneTime.toFixed(2)}</td>
        <td>$ {props.item.monthly.toFixed(2)}</td>
        <td>
          <Button
            data-testid="row-edit-button"
            variant="warning"
            onClick={() => setModalShow((prev) => !prev)}
          >
            Edit
          </Button>
        </td>
        <td>
          <Button
            data-testid="row-delete-button"
            variant="danger"
            onClick={(event) =>
              props.handleDelete(event, props.item.id, props.item.type)
            }
          >
            Delete
          </Button>
        </td>
      </tr>
      {modalShow && (
        <EditModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={props.data}
          item={props.item}
          setExpenses={props.setExpenses}
          setRevenues={props.setRevenues}
        />
      )}
    </>
  );
};

export default Row;
