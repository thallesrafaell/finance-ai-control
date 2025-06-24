import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/auth");
  }
  return (
    <div className="flex h-full items-center justify-center">
      <p>logged user</p>
      <UserButton showName />
    </div>
  );
}
