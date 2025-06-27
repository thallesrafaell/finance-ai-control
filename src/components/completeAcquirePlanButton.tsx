"use client";
import { createCheckout } from "@/app/_actions/checkout/createChekout";
import { Button } from "./ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const PLUBLIC_KEY_STRIPE = process.env.NEXT_PUBLIC_STRIPE_PLUBLIC_KEY;

const CompleteAcquirePlanButton = () => {
  const { user } = useUser();

  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createCheckout();

    if (!PLUBLIC_KEY_STRIPE) {
      throw new Error("Stripe public key not configured");
    }
    const stripe = await loadStripe(PLUBLIC_KEY_STRIPE);

    if (!stripe) {
      throw new Error("Stripe not loaded");
    }
    await stripe.redirectToCheckout({
      sessionId,
    });
  };

  const hasPremiumPlan = user?.publicMetadata?.subscriptionPlan === "premium";
  if (hasPremiumPlan) {
    return (
      <Button className="w-full rounded-full" variant={"link"} asChild>
        <Link
          href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL!}?prefilled_email=${user.emailAddresses[0].emailAddress}`}
        >
          Gerenciar Plano
        </Link>
      </Button>
    );
  }
  return (
    <Button
      className="w-full rounded-full bg-green-600 font-bold text-white"
      onClick={handleAcquirePlanClick}
    >
      Assinar Plano Premium
    </Button>
  );
};

export default CompleteAcquirePlanButton;
