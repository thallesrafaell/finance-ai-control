"use client";
import { PencilIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import UpsertTransactionDialog from "./upserTransactionDialog";
import { Transaction } from "@/generated/prisma";

interface EditTransactionButtonProps {
  transaction: Transaction;
}

const EditTransactionButton = ({ transaction }: EditTransactionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={() => setIsOpen(true)}
        className="text-muted-foreground"
      >
        <PencilIcon />
      </Button>
      <UpsertTransactionDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        defaultValues={{
          ...transaction,
          amount: Number(transaction.amount),
        }}
        transactionId={transaction.id}
      />
    </>
  );
};

export default EditTransactionButton;
