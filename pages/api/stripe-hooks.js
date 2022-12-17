import { buffer } from 'micro';
import initStripe from 'stripe';
import connectMongo from '../../database/connection';
import Users from '../../models/Schema';

export const config = { api: { bodyParser: false } };

const handler = async (req, res) => {
	connectMongo().catch((error) => res.json({ error: 'Připojení Selhalo' }));
	const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
	const signature = req.headers['stripe-signature'];
	const signingSecret = process.env.STRIPE_SIGNING_SECRET;
	const reqBuffer = await buffer(req);

	let event;

	try {
		event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
	} catch (error) {
		console.log(error);
		return res.status(400).send(`Webhook error: ${error.message}`);
	}
	switch(event.type)
	{
		case 'customer.subscription.created':
			const customer = await Users.findOne({ stripeCustomerId: event.data.object.customer });
			if(event.data.object.plan.id == "price_1MCOI4Ie6OfE8rNR3OClLkk1") {
			  customer.subscribtionRole = "basic";
			}
			else if (event.data.object.plan.id == "price_1MCOIbIe6OfE8rNR2duYdF6J") {
			  customer.subscribtionRole = "pro";
			}
			else if (event.data.object.plan.id == "price_1MCOJIIe6OfE8rNRpd2HTMwR") {
			  customer.subscribtionRole = "enterprise";
			}
			else {
			  customer.subscribtionRole = "free";
			}
			// Update the document in the collection
			await Users.updateOne({ stripeCustomerId: event.data.object.customer }, { $set: { subscribtionRole: customer.subscribtionRole }});
			break;
	}
	res.send({ success: true });
};

export default handler;
