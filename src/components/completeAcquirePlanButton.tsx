"use client";
import { createCheckout } from "@/app/_actions/checkout/createChekout";
import { Button } from "./ui/button";
import { loadStripe } from "@stripe/stripe-js";

const PLUBLIC_KEY_STRIPE = process.env.NEXT_PUBLIC_STRIPE_PLUBLIC_KEY;

const CompleteAcquirePlanButton = () => {
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
