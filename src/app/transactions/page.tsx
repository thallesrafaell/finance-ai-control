import { DataTable } from "@/components/ui/dataTable";
import { db } from "@/lib/prisma";
import { transactionColumns } from "./_columns";
import TransactionMobileCard from "@/components/transactionMobileCard";
import AddTransactionButton from "@/components/addTransactionButton";

const TransactionPage = async () => {
  const transactions = await db.transaction.findMany({});
  return (
    <div className="container mx-auto max-w-[1400px] space-y-6 p-6">
      <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTransactionButton />
      </div>
      <div>
        <div className="hidden md:block">
          <DataTable columns={transactionColumns} data={transactions} />
        </div>
        <div className="md:hidden">
          {transactions.map((transaction) => (
            <TransactionMobileCard key={transaction.id} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
