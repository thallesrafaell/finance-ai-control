import NavBar from "@/components/navBar";
import SummaryCards from "@/components/summaryCards";
import TimeSelect from "@/components/timeSelect";
import { TransactionsPieChart } from "@/components/transactionsPieChart";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { isMatch } from "date-fns";
import { redirect } from "next/navigation";

interface HomeProps {
  searchParams: {
    month?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/auth");
  }
  const month = searchParams.month || new Date().getMonth() + 1;
  const where = {
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

  return (
    <>
      <NavBar />
      <div className="container mx-auto max-w-[1400px] space-y-6 p-6">
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr]">
          <div className="flex flex-col space-y-4">
            <SummaryCards
              depositTotal={depositTotal}
              investimentTotal={investimentTotal}
              expenseTotal={expenseTotal}
              balance={balance}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_2fr]">
              <TransactionsPieChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
