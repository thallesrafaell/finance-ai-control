"use client";
import { Transaction } from "@/generated/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import TransactionTypeBadge from "./ui/typeBadge";
import { Button } from "./ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";

const TransactionMobileCard = (transaction: Transaction) => {
  return (
    <Card className="relative mb-4 w-full max-w-sm border p-3">
      <CardHeader className="flex flex-col space-y-2">
        <CardTitle
          className={`text-2xl font-bold ${transaction.type === "DEPOSIT" ? "text-green-600" : transaction.type === "INCOME" ? "text-white" : "text-red-600"}`}
        >
          {transaction.name}
        </CardTitle>
        <CardDescription>
          <TransactionTypeBadge transaction={transaction} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription className="flex justify-between">
          <p className="text-xl font-bold text-gray-200">
            {new Date(transaction.date).toLocaleDateString("pt-BR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </p>
          <p className="text-xl font-bold text-gray-200">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(transaction.amount))}
          </p>
        </CardDescription>
      </CardContent>
      <CardFooter className="absolute top-3 right-2 flex justify-end space-x-2">
        <Button size={"icon"} variant="ghost">
          <PencilIcon />
        </Button>
        <Button size={"icon"} variant="ghost">
          <TrashIcon />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TransactionMobileCard;
