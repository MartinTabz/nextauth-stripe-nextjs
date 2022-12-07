import { compare } from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongo from '../../../database/connection';
import Users from '../../../models/Schema';

export default NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			async authorize(credentials, req) {
				connectMongo().catch((error) => {
					error: 'Connection Failed...!';
				});

				// check user existance
				const result = await Users.findOne({ email: credentials.email });
				if (!result) {
					throw new Error('No user Found with Email Please Sign Up...!');
				}

				// compare()
				const checkPassword = await compare(
					credentials.password,
					result.password
				);

				// incorrect password
				if (!checkPassword || result.email !== credentials.email) {
					throw new Error('Username or Password does not match');
				}

				return result
			},
		}),
	],
	secret: "Ov/sEuExqNHLzTemACpmnLAe7yBLMaIe+BeI3iyXaeg=",
	session: {
		strategy: 'jwt',
	}
});
