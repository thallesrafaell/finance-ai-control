interface TransactionPercentagePerType {
  value: number | undefined;
  title: string;
  icon: React.ReactNode;
}

const PercentageItem = ({
  value,
  title,
  icon,
}: TransactionPercentagePerType) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="rounded-md bg-white/5 p-2">{icon}</div>
        <p className="text-muted-foreground text-sm">{title}</p>
      </div>
      <p className="font-bold text-white">{value}%</p>
    </div>
  );
};

export default PercentageItem;
