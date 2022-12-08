import initStripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";

export default async function handler(req, res) {
	const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
   const { priceId, customerId } = req.body;


   const lineItems = [
      {
         price: priceId,
         quantity: 1,
      },
   ];

   const subscribesession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: "http://localhost:3000/profil",
      cancel_url: "http://localhost:3000"
   });

   res.send({
      id: subscribesession.id,
   });
}