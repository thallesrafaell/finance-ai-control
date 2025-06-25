import { DataTable } from "@/components/ui/dataTable";
import { db } from "@/lib/prisma";
import { transactionColumns } from "./_columns";
import TransactionMobileCard from "@/components/transactionMobileCard";
import AddTransactionButton from "@/components/addTransactionButton";
import { Transaction } from "@/generated/prisma";

const TransactionPage = async () => {
  const transactions: Transaction[] = await db.transaction.findMany({});
  return (
    <div className="container mx-auto max-w-[1400px] space-y-6 p-6">
      <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTransactionButton />
      </div>
      <div>
        <div className="hidden md:block">
          <DataTable
            columns={transactionColumns}
            data={JSON.parse(JSON.stringify(transactions))}
          />
        </div>
        <div className="md:hidden">
          {transactions.map((transaction: Transaction) => (
            <TransactionMobileCard
              key={transaction.id}
              {...JSON.parse(JSON.stringify(transaction))}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
