"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TransactionType } from "@/generated/prisma";

export const description = "A donut chart";

const chartData = [
  {
    type: TransactionType.DEPOSIT,
    amount: 5500,
    fill: "oklch(72.3% 0.219 149.579)",
  },
  {
    type: TransactionType.EXPENSE,
    amount: 3200,
    fill: "oklch(0.645 0.246 16.439)",
  },
  {
    type: TransactionType.INCOME,
    amount: 1800,
    fill: "oklch(0.985 0 0)",
  },
];

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

export function TransactionsPieChart() {
  return (
    <Card className="flex flex-col">
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
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
