import { MouseEvent } from "react";
import Entry from "../models/Entry";
import Row from "./Row";

const Table = (props: {
  type: string;
  data: any[];
  handleDelete: (arg0: MouseEvent<any>, arg1: any, arg2: any) => void;
  setExpenses: (arg0: Entry[]) => void;
  setRevenues: (arg0: Entry[]) => void;
}) => {
  return (
    <table className={`${props.type.toLowerCase()}-table`}>
      <thead>
        <tr>
          <th>{props.type}</th>
        </tr>
        <tr>
          <td></td>
          <th>One-Time</th>
          <th>Monthly</th>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {props.data.length === 0 && (
          <tr>
            <td>No Entries.</td>
          </tr>
        )}
        {props.data.map((item: any, index: number) => {
          return (
            <Row
              key={index}
              data={props.data}
              item={item}
              handleDelete={props.handleDelete}
              setExpenses={props.setExpenses}
              setRevenues={props.setRevenues}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
