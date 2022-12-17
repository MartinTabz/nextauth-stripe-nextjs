import { loadStripe } from '@stripe/stripe-js';
import { hash } from 'bcryptjs';
import initStripe from 'stripe';
import connectMongo from '../../../database/connection';
import Users from '../../../models/Schema';

export default async function handler(req, res) {
	connectMongo().catch((error) => res.json({ error: 'Připojení Selhalo' }));
	const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

	if (req.method === 'POST') {
		if (!req.body) {
			return res.status(404).json({ error: 'Do not have form data' });
		}
		const { name, email, password } = req.body;
		const checkExisting = await Users.findOne({ email });
		if (checkExisting) {
			return res
				.status(422)
				.json({ message: 'User with this e-mail already exists' });
		}
		const customer = await stripe.customers.create({
			email: req.body.email,
			name: req.body.name,
		});
		const role = 'free';
		await Users.create(
			{
				name: name,
				email: email,
				password: await hash(password, 12),
				stripeCustomerId: customer.id,
				subscribtionRole: role,
			},
			function (err, data) {
				if (err) {
					return res.status(404).json({ err });
				}
				res.status(201).json({ status: true, user: data });
			}
		);
	} else {
		res
			.status(500)
			.json({ message: 'HTTP method not valid only POST Accepted' });
	}
}
