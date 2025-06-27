import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: Request) => {
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.error();
  }
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Stripe secret key not configured" },
      { status: 500 },
    );
  }

  const text = await req.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-05-28.basil",
  });

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  switch (event.type) {
    case "invoice.paid":
      const { customer, parent } = event.data.object;
      const clerkUserId = parent?.subscription_details?.metadata?.clerk_user_id;
      (await clerkClient()).users.updateUser(clerkUserId!, {
        privateMetadata: {
          stripeCustomerId: customer,
          stripeSubscriptionId: parent?.subscription_details?.subscription,
        },
        publicMetadata: {
          subscriptionPlan: "premium",
        },
      });

      break;
    case "customer.subscription.deleted":
      const clerkCancelUserId = event.data.object.metadata?.clerk_user_id;
      if (!clerkCancelUserId)
        return NextResponse.json(
          { error: "Clerk user ID not found in subscription metadata" },
          { status: 400 },
        );
      await (
        await clerkClient()
      ).users.updateUser(clerkCancelUserId, {
        privateMetadata: {
          stripeCustomerId: null,
          stripeSubscriptionId: null,
        },
        publicMetadata: {
          subscriptionPlan: null,
        },
      });

      break;
  }

  return NextResponse.json({ received: true }, { status: 200 });
};
