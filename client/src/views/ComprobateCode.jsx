import { Link, redirect, useNavigate } from "react-router-dom";
import Input from "../components/auth/Input";
import Image from "../components/auth/partials/Image";
import Button from "../components/auth/partials/Button";
import security from "/security.svg";
import { useState } from "react";

function ComprobateCode() {
	const navigate = useNavigate();
	const [code, setCode] = useState("");
	function handleChane({ target: { value } }) {
		const sanitized = value.replace(/\D/g, "").slice(0, 4);
		setCode(sanitized);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		if (code.length === 4) {
			navigate(`/change-pass/${code}`);
		}
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
				<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
					<Input
						text="Codigo de verificacion"
						name="code"
						event={handleChane}
						value={code}
					/>
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
