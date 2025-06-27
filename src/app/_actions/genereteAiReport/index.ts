"use server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";

import { db } from "@/lib/prisma";
import { GenerateAiReportSchema, generateAiReportSchema } from "./schema";

const generateAiReport = async ({ month }: GenerateAiReportSchema) => {
  generateAiReportSchema.parse({ month });
  console.log("MES:>>>>>>>>>>>>>>>>>>", month);
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const user = await (await clerkClient()).users.getUser(userId);
  if (user.publicMetadata.subscriptionPlan !== "premium") {
    throw new Error("This feature is only available for premium users");
  }
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const currentYear = new Date().getFullYear();
  const monthNumber = parseInt(month, 10);

  const startOfPeriod = new Date(
    Date.UTC(currentYear, monthNumber - 1, 1, 0, 0, 0, 0),
  );

  const endOfPeriod = new Date(
    Date.UTC(currentYear, monthNumber, 1, 0, 0, 0, 0),
  );
  // ----------------------------------------------------------------------------------

  console.log("Iniciando o período (final):", startOfPeriod);
  console.log("Finalizando o período (final):", endOfPeriod);

  const transactions = await db.transaction.findMany({
    where: {
      userId,
      createdAt: {
        gte: startOfPeriod,
        lt: endOfPeriod,
      },
    },
  });

  // --- Log para ver quantas transações foram encontradas ---
  console.log("Transações Encontradas:", transactions.length);
  // ---------------------------------------------------------

  if (transactions.length === 0) {
    throw new Error("No transactions found for the specified month");
  }

  const content = `Gere APENAS um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira. NÃO inclua qualquer introdução, explicação sobre os dados ou frases de agradecimento. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
  ${transactions
    .map(
      (transaction) =>
        `${transaction.date.toLocaleDateString("pt-BR")}-R$${transaction.amount}-${transaction.type}-${transaction.category}`,
    )
    .join(";")}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: content,
  });
  return response.text;
};

export default generateAiReport;
