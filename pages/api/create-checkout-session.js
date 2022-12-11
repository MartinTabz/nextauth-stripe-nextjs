import initStripe from 'stripe';
import {  NextResponse } from 'next/server'

export default async function handler(req, res) {
	const stripe = await initStripe(process.env.STRIPE_SECRET_KEY);

	const { priceId, customerId } = req.body;

   const checkoutsession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [
         {
            price: priceId,
            quantity: 1,
         },
      ],
      success_url: 'http://localhost:3000/uspesne-predplaceno',
      cancel_url: 'http://localhost:3000/platba-zrusena'
   });
   if (checkoutsession) {
      res.send({id: checkoutsession.url})
   }
   else {
      throw new Error('Something went wrong while creating a Stripe checkout session');
   }
}
