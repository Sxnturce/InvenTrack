import { Link } from "react-router-dom";
import Input from "../components/auth/Input";
import Image from "../components/auth/partials/Image";
import Button from "../components/auth/partials/Button";
import Optional from "../components/auth/partials/Optional";
import Playground from "../components/auth/partials/Playground";
import register_img from "/protected_img.svg";

function Register() {
	return (
		<>
			<section className="bg-white p-4 md:p-8 rounded flex flex-col gap-6  max-w-[550px] lg:max-w-none mx-auto w-full">
				<div className="flex flex-col gap-4">
					<h1 className="text-color-main font-extrabold text-4xl text-center lg:text-left ">
						Create Account
					</h1>
				</div>
				<div className="flex flex-col gap-6">
					<Input text="Nombre" name="name" />
					<Input text="Email" name="email" type="email" />
					<Input text="Contraseña" name="password" type="password" />
					<Input
						text="Repetir contraseña"
						name="repet_password"
						type="password"
						repet={true}
					/>
					<Button value={"Create Account"} />
				</div>
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
