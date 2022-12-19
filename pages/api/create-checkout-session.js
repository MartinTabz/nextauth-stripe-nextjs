import initStripe from 'stripe';

export default async function handler(req, res) {
	const stripe = await initStripe(process.env.STRIPE_SECRET_KEY);

	const { priceId, customerId } = req.body;

   if(!customerId) {
      return res.status(401).send("Unauthorized");
   }


   const checkoutsession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [
         {
            price: priceId,
            quantity: 1,
         },
      ],
      success_url: process.env.NEXTAUTH_URL + '/uspesne-predplaceno',
      cancel_url: process.env.NEXTAUTH_URL + '/platba-zrusena'
   });
   if (checkoutsession) {
      res.send({id: checkoutsession.url})
   }
   else {
      throw new Error('Something went wrong while creating a Stripe checkout session');
   }
}
