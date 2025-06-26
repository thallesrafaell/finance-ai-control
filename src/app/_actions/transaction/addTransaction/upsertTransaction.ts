"use server";

import { Prisma } from "@/generated/prisma";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { addTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const addTransaction = async (
  data: Omit<Prisma.TransactionCreateInput, "userId"> & { id: string },
) => {
  addTransactionSchema.parse(data);
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  await db.transaction.upsert({
    create: {
      ...data,
      userId,
    },
    update: {
      ...data,
      userId,
    },
    where: {
      id: data.id || "",
    },
  });

  revalidatePath("/transactions");
};
