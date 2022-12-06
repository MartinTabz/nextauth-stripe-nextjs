import { getSession, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
	const { data: session } = useSession();

	function handleSignOut() {
		signOut();
	}

	return (
		<div>
			<Head>
				<title>Home Page</title>
			</Head>

			{session ? User({ session, handleSignOut }) : Guest()}
		</div>
	);
}

// Guest
function Guest() {
	return (
		<>
			<Head>
				<title>Domov</title>
				<meta
					name="description"
					content="Testovací aplikace pro přihlašování"
				/>
			</Head>
			<div className="container mx-auto text-center py-20">
				<h3 className="text-4xl font-bold">Guest Homepage</h3>
				<div className="flex justify-center">
					<Link
						href={'/auth/login'}
						className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-black"
					>
						Přihlásit se
					</Link>
				</div>
			</div>
		</>
	);
}

function User({ session, handleSignOut }) {
	return (
		<>
			<Head>
				<title>Domov</title>
				<meta
					name="description"
					content="Testovací aplikace pro přihlašování"
				/>
			</Head>
			<div className="container mx-auto text-center py-20">
				<h3 className="text-4xl font-bold">User Homepage</h3>

				<div className="flex justify-center">
					<Link
						href={'/profil'}
						className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-black"
					>
						Profile
					</Link>
				</div>

				<div className="details">
					<h4>{session.user.name}</h4>
					<h4>{session.user.email}</h4>
				</div>

				<div className="flex justify-center">
					<button
						onClick={handleSignOut}
						className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-50"
					>
						Odhlásit
					</button>
				</div>
			</div>
		</>
	);
}

export async function getServerSideProps({ req }) {
	const session = await getSession({ req });

	if (!session) {
		return {
			redirect: {
				destination: '/auth/prihlasit',
				permanent: false,
			},
		};
	}

	return {
		props: { session },
	};
}
