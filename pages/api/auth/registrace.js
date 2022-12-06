import { hash } from 'bcryptjs';
import connectMongo from '../../../database/connection';
import Users from '../../../models/Schema';

export default async function handler(req, res) {
	connectMongo().catch((error) => res.json({ error: 'Připojení Selhalo' }));

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
		Users.create({ name, email, password: await hash(password, 12) }, function(err, data){
         if (err){
            return res.status(404).json({err});
         }
         res.status(201).json({status: true, user: data})
      });
	} else {
		res
			.status(500)
			.json({ message: 'HTTP method not valid only POST Accepted' });
	}
}
