import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

if (!stripe) {
    throw new Error('Stripe secret key is not defined');
  }

export async function POST(request) {
    let data = await request.json();
    let priceId = data.priceId;
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: 'https://paws-and-hearts.vercel.app/adopt_a_paw',
        cancel_url: 'http://localhost:3000'
    });

    return NextResponse.json(session.url);
}
