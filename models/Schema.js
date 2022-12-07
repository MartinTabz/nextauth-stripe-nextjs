import { model, models, Schema } from 'mongoose';

const userSchema = new Schema({
	name: String,
	email: String,
	password: String,
	stripeCustomerId: String,
});

const Users = models.user || model('user', userSchema);

export default Users;
