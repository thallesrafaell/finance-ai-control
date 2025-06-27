import { DataTable } from "@/components/ui/dataTable";
import { db } from "@/lib/prisma";
import { transactionColumns } from "./_columns";
import TransactionMobileCard from "@/components/transactionMobileCard";
import AddTransactionButton from "@/components/addTransactionButton";
import { Transaction } from "@/generated/prisma";
import NavBar from "@/components/navBar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { canUserAddTransaction } from "../_data/canUserAddTransaction";

const TransactionPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/auth");
  }
  const transactions: Transaction[] = await db.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const userCanCreateTransaction = await canUserAddTransaction();
  return (
    <>
      <NavBar />
      <div className="container mx-auto max-w-[1400px] space-y-6 p-6">
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton
            userCanCreateTransaction={userCanCreateTransaction}
          />
        </div>
        <div>
          <div className="hidden md:block">
            <ScrollArea className="h-[70vh] rounded-md border">
              <DataTable
                columns={transactionColumns}
                data={JSON.parse(JSON.stringify(transactions))}
              />
            </ScrollArea>
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
    </>
  );
};

export default TransactionPage;
