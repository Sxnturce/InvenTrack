import { Link } from "react-router-dom";
import Input from "../components/auth/Input";
import Image from "../components/auth/partials/Image";
import Button from "../components/auth/partials/Button";
import changePass from "/change_pass.svg";
import { passValidatePartial } from "../validate/userValidate.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import clientAxios from "../config/Axios";

function ChangePass() {
	const [pass, setPass] = useState("");
	const [repet, setRepet] = useState("");
	const formRef = useRef(null);
	const location = useLocation();
	const navigate = useNavigate();
	const [spinner, setSpinner] = useState(false);

	const [errPass, setErrPass] = useState("");
	const [errRepet, setErrRepet] = useState("");
	const { code } = useParams();
	useEffect(() => {
		async function comprobateState() {
			const { validate } = location.state || {};
			if (!validate) {
				return navigate("/olvide-password");
			}
		}
		comprobateState();
	}, []);

	useEffect(() => {
		setErrRepet("");
		setErrPass("");
	}, [pass, repet]);

	async function handleSubmit(e) {
		e.preventDefault();
		const result = passValidatePartial({
			pass: pass,
		});

		if (!result.success) {
			const { issues } = result.error;

			if (issues[0].path[0] === "pass") {
				setErrPass(issues[0].message);
				return;
			}
		}

		if (result.data.pass !== repet) {
			return setErrRepet("Las contraseñas no coinciden.");
		}
		setSpinner(true);
		try {
			await clientAxios.post(`user/change-password/${code}`, {
				pass: result.data.pass,
			});
			setSpinner(false);
			formRef.current.reset();
			resetStates();
			navigate("/", { state: { update: true } });
		} catch (e) {
			const { msg } = e.response?.data;
			setSpinner(false);
			setErrPass(msg);
		}
	}

	function resetStates() {
		setPass("");
		setRepet("");
	}
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
				<form
					className="flex flex-col gap-6"
					method="POST"
					onSubmit={handleSubmit}
					ref={formRef}
				>
					<Input
						text="Contraseña"
						name="password"
						type={"password"}
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
					{spinner && <span className="spinner-form"></span>}
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
