import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserButton } from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MobileNavBarProps {
  linkClassName: (path: string) => string;
}

export function MobileNavBar({ linkClassName }: MobileNavBarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon width={30} height={30} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <Image src="/images/logo.svg" alt="Logo" width={150} height={39} />
          </SheetTitle>
          <SheetDescription>Simples e eficiente.</SheetDescription>
        </SheetHeader>
        <div>
          <nav className="flex flex-col items-start gap-4 border-b border-solid px-4 pb-12">
            <Link href="/" className={linkClassName("/") + " text-xl"}>
              Home
            </Link>
            <Link
              href="/transactions"
              className={linkClassName("/transactions") + " text-xl"}
            >
              Transações
            </Link>
            <Link
              href="/subscription"
              className={linkClassName("/subscription") + " mb-4 text-xl"}
            >
              Assinaturas
            </Link>
          </nav>
        </div>
        <div className="flex px-2">
          <UserButton showName />
        </div>
      </SheetContent>
    </Sheet>
  );
}
