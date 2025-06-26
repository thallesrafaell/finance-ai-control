"use client";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import AddTransactionButton from "./addTransactionButton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface SummaryCardProps {
  icon?: React.ReactNode;
  title: string;
  value: number;
  size?: "sm" | "lg";
  showValues: boolean;
  setShowValues: (show: boolean) => void;
}

const SummaryCard = ({
  icon,
  title,
  value,
  size = "sm",
  showValues,
  setShowValues,
}: SummaryCardProps) => {
  return (
    <Card className={size === "sm" ? "bg-transparent" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          <p
            className={
              size === "sm"
                ? "text-muted-foreground"
                : "text-xl text-white opacity-70"
            }
          >
            {title}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between md:flex-row">
        <div className="flex items-start gap-4">
          {showValues ? (
            <p
              className={
                size === "sm" ? "text-2xl font-bold" : "text-4xl font-bold"
              }
            >
              {value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          ) : (
            <Skeleton className={size === "sm" ? "h-8 w-45" : "h-12 w-55"} />
          )}

          {size === "lg" && (
            <button
              onClick={() => setShowValues(!showValues)}
              className="text-muted-foreground flex items-center gap-2 text-sm hover:text-white"
            >
              {showValues ? <EyeIcon size={30} /> : <EyeClosedIcon size={30} />}
            </button>
          )}
        </div>
        {size === "lg" && <AddTransactionButton />}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
