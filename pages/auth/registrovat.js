import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { HiAtSymbol, HiFingerPrint, HiUser } from 'react-icons/hi';
import Layout from '../../components/layout';
import { RegistraceValidate } from '../../lib/validate';
import styles from '../../styles/Form.module.css';
import { useRouter } from 'next/router';

export default function Registrovat() {
	const [show, setShow] = useState({ password: false, cpassword: false });
	const router = useRouter()
	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
			cpassword: '',
		},
		validate: RegistraceValidate,
		onSubmit,
	});

	async function onSubmit(values) {
		const options = {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(values),
		};
		await fetch('/api/auth/registrace', options).then(
			(res) => res.json()
		).then((data) => {
			if(data) router.push("/auth/prihlasit")
		});
	}

	return (
		<Layout>
			<Head>
				<title>Registrace</title>
				<meta
					name="description"
					content="Testovací aplikace pro přihlašování"
				/>
			</Head>
			<section className="w-3/4 mx-auto flex flex-col gap-10">
				<div className="title">
					<h1 className="text-gray-800 text-4xl font-bold py-4">Registrace</h1>
				</div>
				<form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
					<div className={styles.input_group}>
						<input
							className={styles.input_text}
							type="text"
							name="name"
							placeholder="Celé Jméno"
							{...formik.getFieldProps('name')}
						/>
						<span className="icon flex items-center px-4">
							<HiUser size={25} />
						</span>
					</div>
					{formik.errors.name && formik.touched.name ? (
						<span className="text-rose-500">{formik.errors.name}</span>
					) : (
						<></>
					)}
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
							type={`${show.password ? 'text' : 'password'}`}
							name="password"
							placeholder="Heslo"
							{...formik.getFieldProps('password')}
						/>
						<span
							className="icon flex items-center px-4 cursor-pointer"
							onClick={() => setShow({ ...show, password: !show.password })}
						>
							<HiFingerPrint size={25} />
						</span>
					</div>
					{formik.errors.password && formik.touched.password ? (
						<span className="text-rose-500">{formik.errors.password}</span>
					) : (
						<></>
					)}
					<div className={styles.input_group}>
						<input
							className={styles.input_text}
							type={`${show.cpassword ? 'text' : 'password'}`}
							name="cpassword"
							placeholder="Heslo Znovu"
							{...formik.getFieldProps('cpassword')}
						/>
						<span
							className="icon flex items-center px-4 cursor-pointer"
							onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
						>
							<HiFingerPrint size={25} />
						</span>
					</div>
					{formik.errors.cpassword && formik.touched.cpassword ? (
						<span className="text-rose-500">{formik.errors.cpassword}</span>
					) : (
						<></>
					)}
					<div className="input-button">
						<button className={styles.button} type="submit">
							Registrovat se
						</button>
					</div>
				</form>

				<p className="text-center text-gray-400">
					Máte již účet?{' '}
					<Link className="text-blue-700" href={'/auth/prihlasit'}>
						Přihlásit se
					</Link>
				</p>
			</section>
		</Layout>
	);
}
