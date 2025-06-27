"use client";
import { ArrowDownUp } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import UpsertTransactionDialog from "./upserTransactionDialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface AddTransactionButtonProps {
  userCanCreateTransaction?: boolean;
}

const AddTransactionButton = ({
  userCanCreateTransaction = true,
}: AddTransactionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="mt-4 cursor-pointer rounded-full p-4 font-bold text-white transition-all"
            onClick={() => setIsOpen(true)}
            disabled={!userCanCreateTransaction}
          >
            Nova Transação
            <ArrowDownUp className="mr-2 font-extrabold" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="text-white">
          {userCanCreateTransaction
            ? "Clique para adicionar uma nova transação"
            : "Você atingiu o limite de transações do seu plano. Faça upgrade para adicionar mais transações."}
        </TooltipContent>
      </Tooltip>
      <UpsertTransactionDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default AddTransactionButton;
