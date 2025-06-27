"use client";
import { Dock, Loader } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import generateAiReport from "@/app/_actions/genereteAiReport";
import { toast } from "sonner";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import MarkDown from "react-markdown";
import Link from "next/link";

interface AireportsProps {
  month: string;
  isPremiumPlan: boolean;
}

const Aireports = ({ month, isPremiumPlan }: AireportsProps) => {
  const [report, setReport] = useState<string | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);
  const handleGenerateReport = async () => {
    try {
      setIsGenerating(true);
      const aiReport = await generateAiReport({ month });
      setReport(aiReport);
      toast.success("Relatório gerado com sucesso!");
    } catch (error) {
      toast.error(
        `Erro ao gerar relatório: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-32 cursor-pointer px-6 py-3 font-bold text-white transition-all"
          variant={"outline"}
        >
          <Dock />
          Relatórios IA
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[700px] min-w-[800px] text-white">
        <DialogHeader>
          <DialogTitle>Relatórios IA</DialogTitle>
          <DialogDescription>
            Aqui você pode visualizar os relatórios gerados pela IA.
          </DialogDescription>
        </DialogHeader>
        {isPremiumPlan ? (
          <ScrollArea className="prose prose-h3:text-white prose-h4:text-white prose-p:text-white prose-strong:text-white mb-4 max-h-[450px] text-white">
            {report ? (
              <MarkDown>{report}</MarkDown>
            ) : (
              <p className="text-muted-foreground">
                Clique no botão abaixo para gerar um relatório.
              </p>
            )}
          </ScrollArea>
        ) : (
          <div className="text-white-500 text-center">
            <p>
              Esta funcionalidade está disponível apenas para usuários do plano
              Premium.
            </p>
            <p>
              Atualize seu plano para acessar os relatórios gerados pela IA.
            </p>
            <Button className="mt-4 text-white" asChild>
              <Link href="/subscription">Atualizar Plano</Link>
            </Button>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Fechar</Button>
          </DialogClose>
          <Button
            className="bg-green-600 text-white"
            onClick={handleGenerateReport}
            disabled={isGenerating || !isPremiumPlan}
          >
            {isGenerating ? (
              <Loader className="mr-2 animate-spin" />
            ) : (
              <Dock className="mr-2" />
            )}
            Gerar Relatório
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Aireports;
