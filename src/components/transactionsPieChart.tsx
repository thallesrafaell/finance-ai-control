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
  // Verificar se os valores são válidos (não undefined, não NaN, e não zero para todos)
  const isValidDeposit =
    depositTotal !== undefined &&
    !Number.isNaN(depositTotal) &&
    depositTotal > 0;
  const isValidExpense =
    expenseTotal !== undefined &&
    !Number.isNaN(expenseTotal) &&
    expenseTotal > 0;
  const isValidInvestment =
    investimentTotal !== undefined &&
    !Number.isNaN(investimentTotal) &&
    investimentTotal > 0;

  // Verificar se os percentuais são válidos
  const hasValidPercentages =
    typesPercentage !== undefined &&
    ((typesPercentage[TransactionType.DEPOSIT] !== undefined &&
      !Number.isNaN(typesPercentage[TransactionType.DEPOSIT])) ||
      (typesPercentage[TransactionType.EXPENSE] !== undefined &&
        !Number.isNaN(typesPercentage[TransactionType.EXPENSE])) ||
      (typesPercentage[TransactionType.INCOME] !== undefined &&
        !Number.isNaN(typesPercentage[TransactionType.INCOME])));

  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: isValidDeposit ? depositTotal : 0,
      fill: chartConfig[TransactionType.DEPOSIT].color,
    },
    {
      type: TransactionType.EXPENSE,
      amount: isValidExpense ? expenseTotal : 0,
      fill: chartConfig[TransactionType.EXPENSE].color,
    },
    {
      type: TransactionType.INCOME,
      amount: isValidInvestment ? investimentTotal : 0,
      fill: chartConfig[TransactionType.INCOME].color,
    },
  ];

  // Só mostrar o gráfico se tiver pelo menos um valor válido E percentuais válidos
  const hasData =
    (isValidDeposit || isValidExpense || isValidInvestment) &&
    hasValidPercentages;

  return hasData ? (
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
            value={
              typesPercentage?.[TransactionType.DEPOSIT] &&
              !Number.isNaN(typesPercentage?.[TransactionType.DEPOSIT])
                ? typesPercentage?.[TransactionType.DEPOSIT]
                : 0
            }
            title="Receitas"
            icon={<TrendingUp size={16} className="text-primary h-4" />}
          />
          <PercentageItem
            value={
              typesPercentage?.[TransactionType.INCOME] &&
              !Number.isNaN(typesPercentage?.[TransactionType.INCOME])
                ? typesPercentage?.[TransactionType.INCOME]
                : 0
            }
            title="Investimentos"
            icon={<PiggyBank size={16} className="text-whiteh-4" />}
          />
          <PercentageItem
            value={
              typesPercentage?.[TransactionType.EXPENSE] &&
              !Number.isNaN(typesPercentage?.[TransactionType.EXPENSE])
                ? typesPercentage?.[TransactionType.EXPENSE]
                : 0
            }
            title="Despesas"
            icon={<TrendingDown size={16} className="text-destructive h-4" />}
          />
        </div>
      </CardContent>
    </Card>
  ) : (
    <Card className="flex flex-col bg-transparent">
      <CardContent className="flex-1 pb-0">
        <div className="text-muted-foreground flex h-full w-full items-center justify-center">
          <p className="text-sm">Seus dados financeiros estão vazios</p>
        </div>
      </CardContent>
    </Card>
  );
}
