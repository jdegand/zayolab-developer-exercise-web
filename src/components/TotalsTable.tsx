import Entry from "../models/Entry";
import { oneTimeReduce, monthlyReduce, totalReduce } from "../utils/functions";

const TotalsTable = (props: {
  revenues: Entry[];
  expenses: Entry[];
  termLength: number;
}) => {
  const oneTimeTotalRevenue = oneTimeReduce(props.revenues);

  const monthlyTotalRevenue = monthlyReduce(props.revenues);

  const oneTimeTotalExpenses = oneTimeReduce(props.expenses);

  const monthlyTotalExpenses = monthlyReduce(props.expenses);

  const totalRevenues = totalReduce(props.revenues, props.termLength);

  const totalExpenses = totalReduce(props.expenses, props.termLength);

  const monthlyContributionProfit = monthlyTotalRevenue - monthlyTotalExpenses;

  const totalContributionProfit = totalRevenues - totalExpenses;

  const contributionMargin =
    totalRevenues !== 0
      ? ((totalContributionProfit / totalRevenues) * 100).toFixed(0)
      : 0;

  const capitalROI =
    totalExpenses === 0 && totalRevenues === 0
      ? 0
      : (
          (oneTimeTotalExpenses - oneTimeTotalRevenue) /
          monthlyContributionProfit
        ).toFixed(1);

  return (
    <table className="totals-table">
      <thead>
        <tr>
          <td className="totals-table-empty-header"></td>
          <th>One-Time</th>
          <th>Monthly</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Revenue</td>
          <td>
            ${" "}
            {oneTimeTotalRevenue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </td>
          <td>
            ${" "}
            {monthlyTotalRevenue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </td>
          <td>
            ${" "}
            {totalRevenues.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </td>
        </tr>
        <tr>
          <td>Expenses</td>
          <td>
            ${" "}
            {oneTimeTotalExpenses.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </td>
          <td>
            ${" "}
            {monthlyTotalExpenses.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </td>
          <td>
            ${" "}
            {totalExpenses.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </td>
        </tr>
        <tr>
          <td>Contribution Profit</td>
          <td></td>
          <td className={monthlyContributionProfit < 0 ? "error" : ""}>
            ${" "}
            {monthlyContributionProfit.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </td>
          <td
            data-testid="totalContributionProfit"
            className={monthlyContributionProfit < 0 ? "error" : ""}
          >
            ${" "}
            {totalContributionProfit.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </td>
        </tr>
        <tr>
          <td>Contribution Margin</td>
          <td></td>
          <td></td>
          <td
            data-testid="contributionMargin"
            className={contributionMargin < 0 ? "error" : ""}
          >
            {contributionMargin}%
          </td>
        </tr>
        <tr>
          <td>Capital ROI (monthly)</td>
          <td></td>
          <td></td>
          <td
            data-testid="capital-roi"
            className={capitalROI < 0 ? "error" : ""}
          >
            {capitalROI}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TotalsTable;
