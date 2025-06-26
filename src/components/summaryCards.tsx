"use client";
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  Wallet2Icon,
} from "lucide-react";
import SummaryCard from "./summaryCard";
import { useState } from "react";

interface SummaryCardsProps {
  depositTotal: number;
  investimentTotal: number;
  expenseTotal: number;
  balance: number;
}

const SummaryCards = ({
  depositTotal,
  investimentTotal,
  expenseTotal,
  balance,
}: SummaryCardsProps) => {
  const [showValues, setShowValues] = useState(true);

  return (
    <div className="space-y-4">
      <SummaryCard
        icon={
          <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-blue-500/70">
            <Wallet2Icon size={16} className="text-white" />
          </div>
        }
        title="Saldo"
        value={balance}
        size="lg"
        showValues={showValues}
        setShowValues={setShowValues}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <SummaryCard
          icon={
            <div className="bg-g flex h-6 w-6 items-center justify-center rounded-sm bg-white">
              <PiggyBankIcon size={16} color="black" />
            </div>
          }
          title="Investido"
          value={investimentTotal}
          showValues={showValues}
          setShowValues={setShowValues}
        />
        <SummaryCard
          icon={
            <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-green-500/70">
              <TrendingUpIcon size={16} className="text-white" />
            </div>
          }
          title="Ganhos"
          value={depositTotal}
          showValues={showValues}
          setShowValues={setShowValues}
        />
        <SummaryCard
          icon={
            <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-red-500/70">
              <TrendingDownIcon size={16} className="text-white" />
            </div>
          }
          title="Despesas"
          value={expenseTotal}
          showValues={showValues}
          setShowValues={setShowValues}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
