import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
    throw new Error('Stripe secret key is not defined');
  }
  
  const stripe = new Stripe(stripeSecretKey);


export async function GET() {
    const prices = await stripe.prices.list({
        limit: 4,
    });

    return NextResponse.json(prices.data.reverse())
}