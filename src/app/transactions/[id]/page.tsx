interface TransactionDetailPageProps {
  params: {
    id: string;
  };
}

const TransactionDetailPage = ({
  params: { id },
}: TransactionDetailPageProps) => {
  return <h1 className="text-2xl font-bold">Transaction Detail Page {id}</h1>;
};

export default TransactionDetailPage;
