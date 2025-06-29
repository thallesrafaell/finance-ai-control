"use server";
import { Stripe } from "stripe";
import { auth } from "@clerk/nextjs/server";

export const createCheckout = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key not configured");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-05-28.basil",
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "boleto"],
    mode: "subscription",
    success_url:
      process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL || `http://localhost:3000/`,
    cancel_url:
      process.env.STRIPE_CANCEL_URL || `http://localhost:3000/subscription`,
    subscription_data: {
      metadata: {
        clerk_user_id: userId,
      },
    },
    line_items: [
      {
        price: process.env.STRIPE_PREMIUM_PRODUCT_PRICE_ID,
        quantity: 1,
      },
    ],
  });

  return { sessionId: session.id, url: session.url };
};
