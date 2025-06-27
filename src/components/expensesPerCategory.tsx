import { TotalExpensePerCategory } from "@/app/_data/getDashboard/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Progress } from "./ui/progress";
import { TRANSACTION_CATEGORY_LABELS } from "@/constants/transaction";
interface TotalExpensePerCategoryProps {
  expensesPerCategory: TotalExpensePerCategory[];
}
const ExpensesPerCategory = ({
  expensesPerCategory,
}: TotalExpensePerCategoryProps) => {
  return expensesPerCategory.length > 0 ? (
    <ScrollArea className="max-h-[80vh] rounded-md border p-6">
      <CardHeader className="mb-4">
        <CardTitle className="text-xl font-semibold">
          Despesas por Categoria
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {expensesPerCategory.map((category) => (
          <div key={category.category} className="space-y-2">
            <div className="flex w-full justify-between">
              <p className="text-sm font-bold">
                {TRANSACTION_CATEGORY_LABELS[category.category]}
              </p>
              <p className="text-sm font-bold">{category.percentageOfTotal}%</p>
            </div>
            <Progress
              className="bg-secondary h-2 rounded-full text-white"
              value={category.percentageOfTotal}
            />
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  ) : (
    <div className="flex h-full w-full items-center justify-center">
      <p className="text-muted-foreground text-sm">
        Não há despesas registradas por categoria.
      </p>
    </div>
  );
};

export default ExpensesPerCategory;
