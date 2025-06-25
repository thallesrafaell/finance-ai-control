"use client";
import { ArrowDownUp } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import UpsertTransactionDialog from "./upserTransactionDialog";

const AddTransactionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="mt-4 cursor-pointer rounded-full p-4 font-bold text-white transition-all"
        onClick={() => setIsOpen(true)}
      >
        Nova Transação
        <ArrowDownUp className="mr-2 font-extrabold" />
      </Button>
      <UpsertTransactionDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default AddTransactionButton;
