import { Link } from "react-router-dom";
import Input from "../components/auth/Input";
import Image from "../components/auth/partials/Image";
import Button from "../components/auth/partials/Button";
import forgot from "/forgot_img.webp";

function OlvidePass() {
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
				<div className="flex flex-col gap-6">
					<Input text="Email" name="email" type="email" />
					<Button value={"Solicitar codigo"} />
				</div>
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
