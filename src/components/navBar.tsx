"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathName = usePathname();

  const isActive = (path: string) => {
    return pathName === path
      ? "text-green-500 font-bold"
      : "text-muted-foreground hover:text-green-500 transition-colors";
  };
  return (
    <div className="border-b border-solid py-4">
      <nav className="container mx-auto flex max-w-[1400px] justify-between px-7">
        <div className="flex items-center gap-10">
          <Image src="/images/logo.svg" alt="Logo" width={173} height={39} />
          <div className="flex items-center gap-10">
            <Link href="/" className={isActive("/")}>
              Home
            </Link>
            <Link href="/transactions" className={isActive("/transactions")}>
              Transações
            </Link>
            <Link href="/subscription" className={isActive("/subscriptions")}>
              Assinaturas
            </Link>
          </div>
        </div>
        <div>
          <UserButton showName />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
