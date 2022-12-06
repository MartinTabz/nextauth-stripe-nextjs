import { useFormik } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi';
import Layout from '../../components/layout';
import { PrihlaseniValidate } from '../../lib/validate';
import styles from '../../styles/Form.module.css';
import { signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router';
import connectMongo from '../../database/connection';

export default function Prihlasit() {
	const [show, setShow] = useState(false);
	const router = useRouter()

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validate: PrihlaseniValidate,
		onSubmit,
	});

	async function onSubmit(values){
		const status = await signIn('credentials', {
			 redirect: false,
			 email: values.email,
			 password: values.password,
			 callbackUrl: "/"
		})

		if(status.ok) router.push(status.url)
		
  }

	return (
		<Layout>
			<Head>
				<title>Přihlášení</title>
				<meta
					name="description"
					content="Testovací aplikace pro přihlašování"
				/>
			</Head>
			<section className="w-3/4 mx-auto flex flex-col gap-10">
				<div className="title">
					<h1 className="text-gray-800 text-4xl font-bold py-4">Přihlášení</h1>
				</div>
				<form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
					<div className={styles.input_group}>
						<input
							className={styles.input_text}
							type="email"
							name="email"
							placeholder="E-Mail"
							{...formik.getFieldProps('email')}
						/>
						<span className="icon flex items-center px-4">
							<HiAtSymbol size={25} />
						</span>
					</div>
					{formik.errors.email && formik.touched.email ? (
						<span className="text-rose-500">{formik.errors.email}</span>
					) : (
						<></>
					)}
					<div className={styles.input_group}>
						<input
							className={styles.input_text}
							type={`${show ? 'text' : 'password'}`}
							name="password"
							placeholder="Heslo"
							{...formik.getFieldProps('password')}
						/>
						<span
							className="icon flex items-center px-4 cursor-pointer"
							onClick={() => setShow(!show)}
						>
							<HiFingerPrint size={25} />
						</span>
					</div>
					{formik.errors.password && formik.touched.password ? (
						<span className="text-rose-500">{formik.errors.password}</span>
					) : (
						<></>
					)}
					<div className="input-button">
						<button className={styles.button} type="submit">
							Přihlásit se
						</button>
					</div>
				</form>

				<p className="text-center text-gray-400">
					Ještě nemáte účet?{' '}
					<Link className="text-blue-700" href={'/auth/registrovat'}>
						Registrovat se
					</Link>
				</p>
			</section>
		</Layout>
	);
}
