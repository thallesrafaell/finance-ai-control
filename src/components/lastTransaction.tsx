import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Transaction } from "@/generated/prisma";
import Image from "next/image";
import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/constants/transaction";

interface LastTransactionProps {
  transactions: Transaction[];
}

const LastTransaction = ({ transactions }: LastTransactionProps) => {
  const getAmountColor = (transaction: Transaction) => {
    if (transaction.type === "DEPOSIT") return "text-green-500";
    if (transaction.type === "EXPENSE") return "text-red-500";
    if (transaction.type === "INCOME") return "text-white-500";
  };

  const getAmountPrefix = (transaction: Transaction) => {
    if (transaction.type === "DEPOSIT") return "+";
    if (transaction.type === "EXPENSE") return "-";
    if (transaction.type === "INCOME") return "-";
  };

  return (
    <Card className="h-[81.2%] w-full bg-transparent">
      <CardHeader className="flex w-full items-center justify-between text-xl">
        <CardTitle className="font-bold">Últimas Transações</CardTitle>
        <Button variant={"outline"} className="rounded-full font-bold" asChild>
          <Link href="/transactions">Ver Todas</Link>
        </Button>
      </CardHeader>
      <ScrollArea className="h-full rounded-md py-6">
        <CardContent className="space-y-6">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-lg bg-white/5 p-3">
                  <Image
                    src={`/images/${TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]}`}
                    alt={transaction.paymentMethod}
                    width={24}
                    height={24}
                  />
                </div>
                <div>
                  <p className="text-sm font-bold">{transaction.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {new Date(transaction.createdAt).toLocaleDateString(
                      "pt-BR",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      },
                    )}
                  </p>
                </div>
              </div>
              <p className={`text-sm font-bold ${getAmountColor(transaction)}`}>
                {getAmountPrefix(transaction)}
                {Number(transaction.amount).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default LastTransaction;
