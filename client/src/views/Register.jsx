import { Link } from "react-router-dom";
import Input from "../components/auth/Input";
import Image from "../components/auth/partials/Image";
import Button from "../components/auth/partials/Button";
import Optional from "../components/auth/partials/Optional";
import Playground from "../components/auth/partials/Playground";
import register_img from "/protected_img.svg";
import Alert from "../helpers/alerts/Alert.js";
import AlertSmall from "../helpers/alerts/AlertSmallError.js";
import { userValidate } from "../validate/userValidate.js";
import { useState, useEffect, useRef } from "react";
import clientAxios from "../config/Axios";

function Register() {
	const [nombre, setNombre] = useState("");
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [repet, setRepet] = useState("");

	const [errNombre, setErrNombre] = useState("");
	const [errEmail, setErrEmail] = useState("");
	const [errPass, setErrPass] = useState("");
	const [errRepet, setErrRepet] = useState("");
	const formRef = useRef(null);
	useEffect(() => {
		setErrNombre("");
		setErrEmail("");
		setErrPass("");
		setErrRepet("");
	}, [nombre, email, pass, repet]);

	async function handleSubmit(e) {
		e.preventDefault();
		const result = userValidate({
			nombre: nombre,
			correo: email,
			pass: pass,
		});

		if (!result.success) {
			const { issues } = result.error;

			if (issues[0].path[0] === "nombre") {
				setErrNombre(issues[0].message);
				return;
			}

			if (issues[0].path[0] === "correo") {
				setErrEmail(issues[0].message);
				return;
			}

			if (issues[0].path[0] === "pass") {
				setErrPass(issues[0].message);
				return;
			}
		}

		if (pass !== repet) {
			return setErrRepet("Las contraseñas no coinciden.");
		}
		try {
			const success = await clientAxios.post("user/register", {
				nombre: result.data.nombre,
				correo: result.data.correo,
				pass: result.data.pass,
			});
			const { msg } = success.data;
			Alert(
				msg,
				"Cuenta creada correctamente virifica tu email para poder ingressar",
				true
			);
			resetStates();
			formRef.current.reset();
			return;
		} catch (e) {
			const { msg } = e.response?.data;
			AlertSmall(msg, "");
		}
	}

	function resetStates() {
		setNombre("");
		setEmail("");
		setPass("");
		setRepet("");
	}
	return (
		<>
			<section className="bg-white p-4 md:p-8 rounded flex flex-col gap-6  max-w-[550px] lg:max-w-none mx-auto w-full">
				<div className="flex flex-col gap-4">
					<h1 className="text-color-main font-extrabold text-4xl text-center lg:text-left ">
						Create Account
					</h1>
				</div>
				<form
					className="flex flex-col gap-6"
					onSubmit={handleSubmit}
					method="POST"
					ref={formRef}
				>
					<Input
						text="Nombre"
						name="name"
						value={nombre}
						event={(e) => {
							setNombre(e.target.value);
						}}
						errMsg={errNombre}
					/>
					<Input
						text="Email"
						name="email"
						type="email"
						value={email}
						event={(e) => {
							setEmail(e.target.value);
						}}
						errMsg={errEmail}
					/>
					<Input
						text="Contraseña"
						name="password"
						type="password"
						value={pass}
						event={(e) => {
							setPass(e.target.value);
						}}
						errMsg={errPass}
					/>
					<Input
						text="Repetir contraseña"
						name="repet_password"
						type="password"
						repet={true}
						value={repet}
						event={(e) => {
							setRepet(e.target.value);
						}}
						errMsg={errRepet}
					/>
					<Button value={"Create Account"} />
				</form>
				<div className="flex justify-between text-[0.8rem] text-center sm:text-sm text-gray-500 underline ">
					<Link to={"/"}>¿Ya tienes una cuenta? Logeate</Link>
					<Link to={"/olvide-password"}>¿Olvidaste tu contraseña?</Link>
				</div>
				<div className="flex flex-col gap-2">
					<Optional />
					<Playground text="Sign in with GitHub" />
				</div>
			</section>
			<Image img={register_img} />
		</>
	);
}

export default Register;
