import { TransactionType } from "@/generated/prisma";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { isMatch } from "date-fns";
import { redirect } from "next/navigation";
import { TotalExpensePerCategory, TransactionPercentagePerType } from "./types";

export const getDashboard = async (month: string | number) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/auth");
  }

  const where = {
    userId,
    date: {
      gte: new Date(new Date().getFullYear(), Number(month) - 1, 1),
      lt: new Date(new Date().getFullYear(), Number(month), 1),
    },
  };

  const monthInvalid = !month || !isMatch(String(month), "MM");
  if (monthInvalid) {
    const currentMonth = Number(new Date().getMonth()) + 1;
    redirect("/?month=" + String(currentMonth).padStart(2, "0"));
  }

  const depositAggregate = await db.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      userId,
      type: "DEPOSIT",
      ...where,
    },
  });

  const investimentAggregate = await db.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      userId,
      type: "INCOME",
      ...where,
    },
  });

  const expenseAggregate = await db.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      userId,
      type: "EXPENSE",
      ...where,
    },
  });

  const depositTotal = Number(depositAggregate._sum.amount);
  const investimentTotal = Number(investimentAggregate._sum.amount);
  const expenseTotal = Number(expenseAggregate._sum.amount);
  const balance = depositTotal - investimentTotal - expenseTotal;

  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount,
  );
  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expenseTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INCOME]: Math.round(
      (Number(investimentTotal || 0) / Number(transactionsTotal)) * 100,
    ),
  };

  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(expenseTotal)) * 100,
    ),
  }));
  const lastTransactions = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 15,
  });

  return {
    depositTotal,
    investimentTotal,
    expenseTotal,
    balance,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions: JSON.parse(JSON.stringify(lastTransactions)),
  };
};
