import NavBar from "@/components/navBar";
import SummaryCards from "@/components/summaryCards";
import TimeSelect from "@/components/timeSelect";
import { TransactionsPieChart } from "@/components/transactionsPieChart";
import { auth } from "@clerk/nextjs/server";
import { isMatch } from "date-fns";
import { redirect } from "next/navigation";
import { getDashboard } from "../_data/getDashboard";
import ExpensesPerCategory from "@/components/expensesPerCategory";
import LastTransaction from "@/components/lastTransaction";

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
  const month =
    searchParams.month || String(new Date().getMonth() + 1).padStart(2, "0");

  const monthInvalid = !month || !isMatch(String(month), "MM");
  if (monthInvalid) {
    const currentMonth = Number(new Date().getMonth()) + 1;
    redirect("/?month=" + String(currentMonth).padStart(2, "0"));
  }

  const dashboardData = await getDashboard(month);

  return (
    <>
      <NavBar />
      <div className="container mx-auto max-w-[1400px] space-y-6 p-6">
        <div className="flex max-h-[60vh] flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr]">
          <div className="flex flex-col space-y-4">
            <SummaryCards {...dashboardData} />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_2fr]">
              <TransactionsPieChart {...dashboardData} />
              <ExpensesPerCategory
                expensesPerCategory={dashboardData.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransaction transactions={dashboardData.lastTransactions} />
        </div>
      </div>
    </>
  );
}
