import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import Image from "next/image";
const AuthPage = () => {
  return (
    <div className="grid h-full grid-cols-2">
      {/* Left Side: FORM */}
      <div className="mx-auto flex max-w-[550px] flex-col justify-center p-8">
        <Image src="/images/logo.svg" alt=" Logo" width={175} height={40} />
        <h1 className="mt-8 mb-3 text-4xl font-bold">Bem-vindo</h1>
        <p className="text-muted-foreground">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
        <Button className="mt-8 cursor-pointer" variant="outline">
          <LogInIcon className="mr-2" />
          Fazer Login ou Criar Conta
        </Button>
      </div>
      {/* Right Side: IMAGE */}
      <div className="relative h-full w-full">
        <Image
          src="/images/login.svg"
          alt="Authentication Background"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default AuthPage;
