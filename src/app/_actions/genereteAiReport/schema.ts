import { isMatch } from "date-fns";
import { z } from "zod";

export const generateAiReportSchema = z.object({
  month: z.string().refine((value) => isMatch(value, "MM"), {
    message: "Invalid month format. Use MM (e.g., 01 for January).",
  }),
});

export type GenerateAiReportSchema = z.infer<typeof generateAiReportSchema>;
