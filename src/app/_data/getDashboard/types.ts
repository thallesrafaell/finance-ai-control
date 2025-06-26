import {
  TransactionCategory,
  TransactionType,
} from "../../../generated/prisma";

export type TransactionPercentagePerType = {
  [key in TransactionType]: number;
};

export interface TotalExpensePerCategory {
  category: TransactionCategory;
  totalAmount: number;
  percentageOfTotal: number;
}
