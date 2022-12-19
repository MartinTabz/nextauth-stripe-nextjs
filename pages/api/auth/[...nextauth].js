import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { compare } from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongo from '../../../database/connection';
import clientPromise from '../../../lib/mongodb';
import Users from '../../../models/Schema';

export default NextAuth({
	adapter: MongoDBAdapter(clientPromise),
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

				return result;
			},
		}),
	],
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60,
		updateAge: 24 * 60 * 60,
	},
	secret: process.env.NEXTAUTH_SECRET,
	jwt: {
		secret: process.env.NEXTAUTH_SECRET,
		encryption: true,
	},
	callbacks: {
		jwt: ({ token, user }) => {
			if (user) {
				token.stripeCustomerId = user.stripeCustomerId;
				token.subscribtionRole = user.subscribtionRole;
			}
			return token;
		},
		session: ({ session, token }) => {
			if (token) {
				session.user.stripeCustomerId = token.stripeCustomerId;
				session.user.subscribtionRole = token.subscribtionRole;
			}
			return session;
		},
	},
});
