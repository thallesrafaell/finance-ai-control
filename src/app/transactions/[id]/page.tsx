interface TransactionDetailPageProps {
  params: {
    id: string;
  };
}

const TransactionDetailPage = ({
  params: { id },
}: TransactionDetailPageProps) => {
  return <h1>Transaction Detail Page {id}</h1>;
};

export default TransactionDetailPage;
