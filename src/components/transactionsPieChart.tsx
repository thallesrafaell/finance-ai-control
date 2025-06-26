"use client";

import { PiggyBank, TrendingDown, TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TransactionType } from "@/generated/prisma";
import { TransactionPercentagePerType } from "@/app/_data/getDashboard/types";
import PercentageItem from "./percetageItem";

export const description = "A donut chart";

const chartConfig = {
  [TransactionType.DEPOSIT]: {
    color: "oklch(72.3% 0.219 149.579)",
    label: "Receita",
  },
  [TransactionType.INCOME]: {
    color: "oklch(0.985 0 0)",
    label: "Investimentos",
  },
  [TransactionType.EXPENSE]: {
    color: "oklch(0.645 0.246 16.439)",
    label: "Despesa",
  },
} satisfies ChartConfig;

interface TransactionsPieChartProps {
  depositTotal?: number;
  investimentTotal?: number;
  expenseTotal?: number;
  typesPercentage?: TransactionPercentagePerType;
}

export function TransactionsPieChart({
  depositTotal,
  investimentTotal,
  expenseTotal,
  typesPercentage,
}: TransactionsPieChartProps) {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositTotal || 0,
      fill: chartConfig[TransactionType.DEPOSIT].color,
    },
    {
      type: TransactionType.EXPENSE,
      amount: expenseTotal || 0,
      fill: chartConfig[TransactionType.EXPENSE].color,
    },
    {
      type: TransactionType.INCOME,
      amount: investimentTotal || 0,
      fill: chartConfig[TransactionType.INCOME].color,
    },
  ];

  return (
    <Card className="flex flex-col bg-transparent">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={85}
              outerRadius={100}
            />
          </PieChart>
        </ChartContainer>
        <div className="space-y-2">
          <PercentageItem
            value={typesPercentage?.[TransactionType.DEPOSIT]}
            title="Receitas"
            icon={<TrendingUp size={16} className="text-primary h-4" />}
          />
          <PercentageItem
            value={typesPercentage?.[TransactionType.INCOME]}
            title="Investimentos"
            icon={<PiggyBank size={16} className="text-whiteh-4" />}
          />
          <PercentageItem
            value={typesPercentage?.[TransactionType.EXPENSE]}
            title="Despesas"
            icon={<TrendingDown size={16} className="text-destructive h-4" />}
          />
        </div>
      </CardContent>
    </Card>
  );
}
