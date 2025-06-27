import CompleteAcquirePlanButton from "@/components/completeAcquirePlanButton";
import NavBar from "@/components/navBar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { CheckIcon, XIcon } from "lucide-react";
import { redirect } from "next/navigation";
import getMonthCurrentTransactions from "../_data/getMonthCurrentTransactions";

const SubscriptionPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/auth");
  }

  const user = await (await clerkClient()).users.getUser(userId);

  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";
  const getAllTransactions = await getMonthCurrentTransactions(userId);
  const allTransactions = JSON.parse(JSON.stringify(getAllTransactions));

  return (
    <>
      <NavBar />
      <div className="container mx-auto max-w-[1400px] space-y-6 p-6">
        <h1 className="text-2xl font-bold">Assinatura</h1>
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <Card className="w-full md:w-[450px]">
            <CardHeader className="relative border-b border-solid py-8">
              {!hasPremiumPlan && (
                <Badge className="absolute top-8 left-12 bg-green-600/40 text-base text-white md:left-20">
                  Ativo
                </Badge>
              )}
              <h2 className="text-center text-lg font-bold">Plano Basic</h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-bold">0,00</span>
                <span className="text-muted-foreground text-2xlfont-medium">
                  /mês
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 text-green-500" />
                <p>Apenas 10 transações por mês({allTransactions}/10)</p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon className="h-5 w-5 text-red-500" />
                <p>Relátorio de IA</p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full md:w-[450px]">
            <CardHeader className="relative border-b border-solid py-8">
              {hasPremiumPlan && (
                <Badge className="absolute top-8 left-12 bg-green-600/40 text-base text-white md:left-20">
                  Ativo
                </Badge>
              )}

              <h2 className="text-center text-lg font-bold">Plano Premium</h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-bold">19,99</span>
                <span className="text-muted-foreground text-2xlfont-medium">
                  /mês
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 text-green-500" />
                <p>Transações ilimitadas</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 text-green-500" />

                <p>Relátorio de IA</p>
              </div>
              <CompleteAcquirePlanButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
