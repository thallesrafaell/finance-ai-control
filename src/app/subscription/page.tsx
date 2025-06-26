import NavBar from "@/components/navBar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const SubscriptionPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/auth");
  }
  return <NavBar />;
};

export default SubscriptionPage;
