"use server";

import { db } from "@/lib/prisma";
import { deleteTransactionSchema, DeleteTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteTransaction = async ({
  transactionId,
}: DeleteTransactionSchema) => {
  deleteTransactionSchema.parse({ transactionId });
  await db.transaction.delete({
    where: {
      id: transactionId,
    },
  });
  revalidatePath("/transactions");
  revalidatePath("/dashboard");
  return { success: true, message: "Transação excluída com sucesso!" };
};
