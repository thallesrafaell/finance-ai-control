import { auth, clerkClient } from "@clerk/nextjs/server";
import getMonthCurrentTransactions from "../getMonthCurrentTransactions";

export const canUserAddTransaction = async () => {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  const user = (await clerkClient()).users.getUser(userId);

  if ((await user).publicMetadata.subscriptionPlan === "premium") return true;

  const getAllTransactions = await getMonthCurrentTransactions(userId);

  return getAllTransactions <= 10;
};
