export default function PrihlaseniValidate(values) {
	const errors = {};

	if (!values.email) {
		errors.email = 'E-Mail Je Vyžadován!';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
		errors.email = 'Neplatná E-Mailová Adresa!';
	}

	if (!values.password) {
		errors.password = 'Heslo Je Vyžadováno!';
	} else if (values.password.includes(' ')) {
		errors.password = 'Heslo nesmí obsahovat mezery';
	} else if (values.password.length < 8 || values.password.length > 32) {
		errors.password = 'Heslo musí mít mezi 8 až 32 znaky';
	}

	return errors;
}

export function RegistraceValidate(values) {
	const errors = {};

	if (!values.name) {
		errors.name = 'Jméno Je Vyžadováno!';
	}

	if (!values.email) {
		errors.email = 'E-Mail Je Vyžadován!';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Neplatná E-Mailová Adresa!';
	}

	// validation for password
	if (!values.password) {
		errors.password = 'Heslo Je Vyžadováno!';
	} else if (values.password.includes(' ')) {
		errors.password = 'Heslo nesmí obsahovat mezery';
	} else if (values.password.length < 8 || values.password.length > 32) {
		errors.password = 'Heslo musí mít mezi 8 až 32 znaky';
	}

	// validate confirm password
	if (!values.cpassword) {
		errors.cpassword = 'Ověření hesla je vyžadováno';
	} else if (values.password !== values.cpassword) {
		errors.cpassword = 'Hesla se neshodují!';
	}

	return errors;
}
