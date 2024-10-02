import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { userValidatePartial } from "../validate/userValidate.js";
import Input from "../components/auth/Input";
import Image from "../components/auth/partials/Image";
import Button from "../components/auth/partials/Button";
import Optional from "../components/auth/partials/Optional";
import Playground from "../components/auth/partials/Playground";
import login_img from "/login_img.svg";
import AlertSmall from "../helpers/alerts/AlertSmallError.js";
import Alert from "../helpers/alerts/Alert.js";
import clientAxios from "../config/Axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";

function Login() {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	const [errEmail, setErrEmail] = useState("");
	const [errPass, setErrPass] = useState("");
	const formRef = useRef(null);
	const navigate = useNavigate();
	const location = useLocation();

	const { auth, setAuth, setUser } = useContext(AuthContext);

	useEffect(() => {
		function isUpdated() {
			const { update, caduced } = location.state || {};
			if (update) {
				Alert(
					"Contraseña actualizada",
					"Su contraseña se actualizo correctamente",
					true,
					true
				);
				window.history.replaceState({}, document.title);
				return;
			}
			if (caduced) {
				Alert(
					"Su sessión caduco",
					"Por favor inicie sesion nuevamente",
					false,
					true
				);
				window.history.replaceState({}, document.title);
				return;
			}
		}
		isUpdated();
	}, []);

	useEffect(() => {
		setErrEmail("");
		setErrPass("");
	}, [email, pass]);

	async function handleSubmit(e) {
		e.preventDefault();
		const result = userValidatePartial({
			correo: email,
			pass: pass,
		});

		if (!result.success) {
			const { issues } = result.error;

			if (issues[0].path[0] === "correo") {
				setErrEmail(issues[0].message);
				return;
			}

			if (issues[0].path[0] === "pass") {
				setErrPass(issues[0].message);
				return;
			}
		}

		try {
			const usuario = await clientAxios.post(
				"user",
				{
					correo: result.data.correo,
					pass: result.data.pass,
				},
				{ withCredentials: true }
			);
			formRef.current.reset();

			resetStates();
			setAuth(true);
			setUser(usuario.data.user);
			return navigate("/admin");
		} catch (e) {
			const { msg } = e?.response?.data ?? e;
			if (e.response.status === 404) return setErrEmail(msg);
			if (e.response.status === 400) return setErrPass(msg);
			AlertSmall(msg, "");
		}
	}

	function resetStates() {
		setEmail("");
		setPass("");
	}
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
				<form
					className="flex flex-col gap-6"
					ref={formRef}
					onSubmit={handleSubmit}
					method="POST"
				>
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
					<Button value={"Login"} />
				</form>
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
