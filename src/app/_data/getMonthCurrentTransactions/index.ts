import { db } from "@/lib/prisma";
import { endOfMonth, startOfMonth } from "date-fns";

const getMonthCurrentTransactions = async (userId: string) => {
  const start = startOfMonth(new Date());
  const end = endOfMonth(new Date());

  const transactions = await db.transaction.count({
    where: {
      userId,
      createdAt: {
        gte: start,
        lte: end,
      },
    },
  });

  return transactions;
};

export default getMonthCurrentTransactions;
