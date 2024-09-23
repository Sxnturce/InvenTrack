import { Link } from "react-router-dom";
import Input from "../components/auth/Input";
import Image from "../components/auth/partials/Image";
import Button from "../components/auth/partials/Button";
import changePass from "/change_pass.svg";
import { useState } from "react";

function ChangePass() {
	return (
		<>
			<section className="bg-white p-4 md:p-8 rounded flex flex-col gap-12  max-w-[550px] lg:max-w-none mx-auto w-full justify-center mt-24 md:mt-0">
				<div className="flex flex-col gap-4">
					<h1 className="text-color-main font-extrabold text-4xl text-center lg:text-left ">
						Cambiar contraseña
					</h1>
					<p className="text-[#b3b3b3] text-[0.96rem] hidden sm:block">
						Ingrese su nueva contraseña y repitela para cambiarla correctamente
						y recuperar su cuenta en <strong>InvenTrack</strong>.
					</p>
				</div>
				<form className="flex flex-col gap-6">
					<Input text="Contraseña" name="password" type={"password"} />
					<Input
						text="Repetir contraseña"
						name="repet_password"
						type="password"
						repet={true}
					/>
					<Button value={"Change Password"} />
				</form>
				<div className="flex justify-end text-[0.8rem] text-center sm:text-sm text-gray-500 underline ">
					<Link to={"/"}>Regresar a la pagina principal</Link>
				</div>
			</section>
			<Image img={changePass} contain={true} />
		</>
	);
}

export default ChangePass;
