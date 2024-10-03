import { Link, redirect, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { tokenPassValidate } from "../validate/tokenValidate.js";
import Input from "../components/auth/Input";
import Image from "../components/auth/partials/Image";
import Button from "../components/auth/partials/Button";
import AlertSmall from "../helpers/alerts/AlertSmallError.js";
import clientAxios from "../config/Axios";
import security from "/security.svg";

function ComprobateCode() {
	const [code, setCode] = useState("");
	const [length, setLength] = useState(0);
	const [errPass, setErrPass] = useState("");
	const [spinner, setSpinner] = useState(false);

	const formRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		setErrPass("");
	}, [code]);

	function handleChange({ target: { value } }) {
		const sanitized = value.replace(/\D/g, "").slice(0, 6);
		setLength(sanitized);
		setCode(sanitized);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const result = tokenPassValidate({ token_pass: Number(code) });

		if (!result.success) {
			const { issues } = result.error;

			if (issues[0].path[0] === "token_pass") {
				setErrPass(issues[0].message);
				return;
			}
		}
		setSpinner(true);
		try {
			await clientAxios.post("user/comprobate-token-pass", {
				token_pass: result.data.token_pass,
			});
			setSpinner(false);
			formRef.current.reset();
			resetStates();
			return navigate(`/change-pass/${result.data.token_pass}`, {
				state: { validate: true },
			});
		} catch (e) {
			const { err } = e.response?.data;
			setErrPass(err);
			setSpinner(false);
		}
	}

	function resetStates() {
		setCode("");
	}
	return (
		<>
			<section className="bg-white p-4 md:p-8 rounded flex flex-col gap-12  max-w-[550px] lg:max-w-none mx-auto w-full justify-center mt-24 md:mt-0">
				<div className="flex flex-col gap-4">
					<h1 className="text-color-main font-extrabold text-4xl text-center lg:text-left ">
						Comprueba tu codigo de verificacion
					</h1>
					<p className="text-[#b3b3b3] text-[0.96rem] hidden sm:block">
						Ingresa su codigo de 4 digitos para poder recuperar su cuenta de{" "}
						<strong>InvenTrack</strong>.
					</p>
				</div>
				<form
					className="flex flex-col gap-6"
					onSubmit={handleSubmit}
					ref={formRef}
				>
					<Input
						text="Codigo de verificacion"
						name="code"
						event={handleChange}
						value={code}
						code={true}
						length={length}
						errMsg={errPass}
					/>
					{spinner && <span className="spinner-form"></span>}
					<Button value={"Comprobar codigo"} />
				</form>
				<div className="flex justify-between text-[0.8rem] text-center sm:text-sm text-gray-500 underline ">
					<Link to={"/olvide-password"}>¿No tienes un codigo?</Link>
					<Link to={"/"}>Regresar a la pagina principal</Link>
				</div>
			</section>
			<Image img={security} contain={true} />
		</>
	);
}

export default ComprobateCode;
