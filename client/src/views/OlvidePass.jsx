import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { emailPassValidate } from "../validate/tokenValidate.js";
import Input from "../components/auth/Input";
import Image from "../components/auth/partials/Image";
import Button from "../components/auth/partials/Button";
import forgot from "/forgot_img.webp";
import clientAxios from "../config/Axios";

function OlvidePass() {
	const [email, setEmail] = useState("");
	const [errEmail, setErrEmail] = useState("");
	const formRef = useRef(null);
	const [spinner, setSpinner] = useState(false);

	const navigate = useNavigate();
	useEffect(() => {
		setErrEmail("");
	}, [email]);

	async function handleSubmit(e) {
		e.preventDefault();
		const result = emailPassValidate({
			correo: email,
		});

		if (!result.success) {
			const { issues } = result.error;

			if (issues[0].path[0] === "correo") {
				setErrEmail(issues[0].message);
				return;
			}
		}
		setSpinner(true);
		try {
			await clientAxios.post("user/forgot-pass", {
				correo: result.data.correo,
			});
			setSpinner(false);
			formRef.current.reset();
			resetStates();
			return navigate("/comprobation");
		} catch (e) {
			const { msg } = e.response?.data;
			setSpinner(false);
			setErrEmail(msg);
		}
	}

	function resetStates() {
		setEmail("");
	}
	return (
		<>
			<section className="bg-white p-4 md:p-8 rounded flex flex-col gap-12  max-w-[550px] lg:max-w-none mx-auto w-full justify-center mt-24 md:mt-0">
				<div className="flex flex-col gap-4">
					<h1 className="text-color-main font-extrabold text-4xl text-center lg:text-left ">
						Olvide mi password
					</h1>
					<p className="text-[#b3b3b3] text-[0.96rem] hidden sm:block">
						Ingresa tu email para que asi nuestro soporte de{" "}
						<strong>InvenTrack</strong> pueda enviarte un codigo para que
						recuperes tu cuenta.
					</p>
				</div>
				<form
					className="flex flex-col gap-6"
					method="POST"
					onSubmit={handleSubmit}
					ref={formRef}
				>
					<Input
						text="Email"
						name="email"
						type="email"
						value={email}
						errMsg={errEmail}
						event={(e) => {
							setEmail(e.target.value);
						}}
					/>
					{spinner && <span className="spinner-form"></span>}
					<Button value={"Solicitar codigo"} />
				</form>
				<div className="flex justify-between text-[0.8rem] text-center sm:text-sm text-gray-500 underline ">
					<Link to={"/"}>Regresar a la pagina principal</Link>
					<Link to={"/comprobation"}>¿Ya tienes un codigo?</Link>
				</div>
			</section>
			<Image img={forgot} contain={true} />
		</>
	);
}

export default OlvidePass;
