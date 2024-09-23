import { Link } from "react-router-dom";
import Input from "../components/auth/Input";
import Image from "../components/auth/partials/Image";
import Button from "../components/auth/partials/Button";
import Optional from "../components/auth/partials/Optional";
import Playground from "../components/auth/partials/Playground";
import login_img from "/login_img.svg";

function Login() {
	return (
		<>
			<section className="bg-white p-4 md:p-8 rounded flex flex-col gap-6  max-w-[550px] lg:max-w-none mx-auto w-full">
				<div className="flex flex-col gap-4">
					<h1 className="text-color-main font-extrabold text-4xl text-center lg:text-left ">
						Log in
					</h1>
					<p className="text-[#b3b3b3] text-[0.96rem] hidden sm:block">
						Logeate para poder acceder a nuestro inventario y ver los productos
						de la empresa <strong>InvenTrack</strong>.
					</p>
				</div>
				<div className="flex flex-col gap-6">
					<Input text="Email" name="email" type="email" />
					<Input text="Contraseña" name="password" type="password" />
					<Button value={"Login"} />
				</div>
				<div className="flex justify-between text-[0.8rem] text-center sm:text-sm text-gray-500 underline ">
					<Link to={"/register"}>¿No tienes una cuenta? Registrate</Link>
					<Link to={"/olvide-password"}>¿Olvidaste tu contraseña?</Link>
				</div>
				<div className="flex flex-col gap-2">
					<Optional />
					<Playground text="Continue with GitHub" />
				</div>
			</section>
			<Image img={login_img} />
		</>
	);
}

export default Login;
