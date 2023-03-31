import { Card } from "@mui/material";
import RecentOrdersTable from "./RecentTransactionsTable";
import { useTransactions } from "@usedapp/core";

function RecentTransactions() {
  const { transactions } = useTransactions();
  const cryptoOrders = transactions.map((transaction) => ({
    id: transaction.transaction ? transaction.transaction.hash ?? "-" : "-",
    status: "completed",
    orderDate: transaction.submittedAt ?? "-",
    orderID: transaction.transaction
      ? transaction.transaction.hash ?? "-"
      : "-",
    sourceDesc: transaction.receipt ? transaction.receipt.to ?? "-" : "-",
    name: transaction.transactionName ?? "-",
  }));
  return (
    <Card>
      <RecentOrdersTable cryptoOrders={cryptoOrders} />
    </Card>
  );
}

export default RecentTransactions;
