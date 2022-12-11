import initStripe from 'stripe';

export default async function handler(req, res) {
	const stripe = await initStripe(process.env.STRIPE_SECRET_KEY);
   const { customerId } = req.body;

   if(!customerId) {
      return res.status(401).send("Unauthorized");
   }

   const portalsession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: 'http://localhost:3000/profil'
   })

   res.send({ url: portalsession.url })
}
