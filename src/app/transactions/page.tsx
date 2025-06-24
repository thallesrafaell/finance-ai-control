import { Button } from "@/components/ui/button";

const TransactionPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl font-bold">Transactions</h1>
      <p className="text-gray-600">This page will display all transactions.</p>
      <Button className="mt-4">View Transactions</Button>
    </div>
  );
};

export default TransactionPage;
