import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { dark } from "@clerk/themes";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/auth");
  }
  return (
    <div className="flex h-full items-center justify-center">
      <UserButton showName />
    </div>
  );
}
