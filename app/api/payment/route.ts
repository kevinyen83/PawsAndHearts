import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("Stripe secret key is not defined");
}

const stripe = new Stripe(stripeSecretKey);

export async function POST(request: NextRequest, response: NextResponse) {
  let data = await request.json();
  let priceId = data.priceId;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://paws-and-hearts.vercel.app/donate/donate_success",
    cancel_url: "https://paws-and-hearts.vercel.app/donate/donate_cancel",
  });

  return NextResponse.json(session.url);
}
