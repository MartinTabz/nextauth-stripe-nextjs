import { getSession, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { pricingPlans } from '../database/pricing';
import { HiCheck } from 'react-icons/hi';

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
						href={'/auth/prihlasit'}
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
			<div className="mx-auto max-w-7xl bg-white px-4 pt-24 sm:px-6 lg:px8">
				<h2 className="text-3xl font-extrabold text-black sm:text-5xl sm:leading-tight sm:tracking-tight">
					Zvolte předplatné
				</h2>
				<p className="mt-4 max-w-3xl text-lg text-slate-500">
					Vyberte si cenově dostupný plán s těmi nejlepšími funkcemi určené pro
					vás.
				</p>
			</div>

			<div className="grid lg:grid-cols-3 gap-8 py-24 px-4 sm:px-6 lg:px-8 gap-12 max-w-7xl mx-auto">
				{pricingPlans.map((plan) => (
					<div
						className={`flex flex-col border-2 shadow-lg p-8 bg-white rounded-2xl relative
						${
							plan.mostPopular
								? 'border-blue-500'
								: 'border-slate-200'
						}`}
						key={plan.title}
					>
						<h3 className="text-2xl text-blue-500 font-semibold leading-5">{plan.title}</h3>
						{plan.mostPopular && (
							<p className="absolute -translate-y-1/2 top-0 bg-blue-500 text-white px-3 py-0.5 text-base font-semibold tracking-wide rounded-full shadow-md">
								Oblíbené
							</p>
						)}
						<p className="mt-4 text-slate-700 leading-6">{plan.description}</p>

						<div className="mt-4 py-6 px-4 rounded-2xl bg-slate-50 -mx-4">
							<p className="text-sm font-semibold text-slate-500 flex items-center">
								<span className="text-4xl text-black mr-3">{plan.price}</span>
								<span className="text-lg">{plan.currency}</span>
								<span>{plan.frequency}</span>
							</p>
						</div>

						<ul className='mt-6 space-y-3 flex-1'>
							{plan.features.map((feature) => (
								<li className='flex text-sm text-slate-700 leading-6' key={feature}>
									<HiCheck className='text-blue-500 text-2xl' />
									<span className='ml-3'>{feature}</span>
								</li>
							))}
						</ul>
						<Link className='block text-white bg-blue-500 hover:bg-blue-600 mt-8 px-6 py-4 text-sm font-semibold leading-4 text-center rounded-lg shadow-md' href="/profil">Předplatit</Link>
					</div>
				))}
			</div>

			<div className="mx-auto max-w-7xl bg-white px-4 pt-24 sm:px-6 lg:px8">
				<h2 className="text-3xl font-extrabold text-black sm:text-5xl sm:leading-tight sm:tracking-tight">
					Akce
				</h2>
				<div className='grid gap-3 lg:gap-12 lg:grid-cols-2 my-10 text-center'>
					<Link className='transition text-lg sm:text-3xl py-3 rounded-2xl bg-blue-400 hover:bg-blue-500' href={"/profil"}>Profil</Link>
					<button
						onClick={handleSignOut}
						className="transition text-lg sm:text-3xl py-3 rounded-2xl bg-slate-300 hover:bg-slate-400 "
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
