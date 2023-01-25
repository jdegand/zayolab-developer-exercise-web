import Entry from "../models/Entry";

export function oneTimeReduce(array: Entry[]) {
  return array.reduce((acc: number, curr: Entry) => acc + curr.oneTime, 0);
}

export function monthlyReduce(array: Entry[]) {
  return array.reduce((acc: number, curr: Entry) => acc + curr.monthly, 0);
}

export function totalReduce(array: Entry[], termLength: number) {
  return array.reduce(
    (acc: number, curr: Entry) =>
      acc + curr.oneTime + curr.monthly * termLength,
    0
  );
}

/*

const oneTimeTotalRevenue  = props.revenues.reduce(
    (acc: number, curr: any) => acc + curr.oneTime,
    0
);

const monthlyTotalRevenue = props.revenues.reduce(
    (acc: number, curr: any) => acc + curr.monthly,
    0
);

const oneTimeTotalExpenses = props.expenses.reduce(
    (acc: number, curr: any) => acc + curr.oneTime,
    0
);

const monthlyTotalExpenses = props.expenses.reduce(
    (acc: number, curr: any) => acc + curr.monthly,
    0
);

const totalRevenues = props.revenues.reduce(
    (acc: number, curr: any) =>
      acc + curr.oneTime + curr.monthly * props.termLength,
    0
);

const totalExpenses = props.expenses.reduce(
    (acc: number, curr: any) =>
      acc + curr.oneTime + curr.monthly * props.termLength,
    0
);

*/
