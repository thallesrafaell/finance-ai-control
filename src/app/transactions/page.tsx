import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/dataTable";
import { db } from "@/lib/prisma";
import { ArrowDownUp } from "lucide-react";
import { transactionColumns } from "./_columns";

const TransactionPage = async () => {
  const transactions = await db.transaction.findMany({});
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <Button className="mt-4 cursor-pointer rounded-full p-4 font-bold text-white">
          Nova Transação
          <ArrowDownUp className="mr-2 font-extrabold" />
        </Button>
      </div>
      <div>
        <DataTable columns={transactionColumns} data={transactions} />
      </div>
    </div>
  );
};

export default TransactionPage;
