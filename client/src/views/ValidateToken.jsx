import { Link, redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Image from "../components/auth/partials/Image";
import clientAxios from "../config/Axios";
import success from "/success.svg";
import notFound from "/error.svg";

function ValidateToken() {
	const [confirmed, setConfirmed] = useState(false);
	const { token } = useParams();

	useEffect(() => {
		async function comprobateToken() {
			try {
				await clientAxios.get(`/user/confirm-email/${token}`);
				setConfirmed(true);
			} catch (e) {
				setConfirmed(false);
			}
		}
		comprobateToken();
	}, []);
	return (
		<>
			<section className="bg-white p-4 md:p-8 rounded flex flex-col gap-12  max-w-[550px] lg:max-w-none mx-auto w-full justify-center mt-24 md:mt-0">
				<div className="flex flex-col gap-4">
					<h1
						className={`${
							confirmed ? "text-green-600" : "text-red-700"
						} font-extrabold text-4xl text-center lg:text-left `}
					>
						{confirmed
							? "Correo confirmado correctamente"
							: "Token invalido o inexistente"}
					</h1>
					<p className="text-[#b3b3b3] text-[0.96rem] hidden sm:block">
						Regrese a la pagina principal para logearse y acceder a
						<strong>InvenTrack</strong>.
					</p>
				</div>
				<div className="flex justify-end font-bold text-center ">
					<Link
						to={"/"}
						className={`${
							confirmed ? "bg-green-600" : "bg-red-700"
						} font-semibold text-md text-center lg:text-left text-white p-[0.35rem] rounded`}
					>
						Regresar a la pagina principal
					</Link>
				</div>
			</section>
			<Image img={confirmed ? success : notFound} contain={true} />
		</>
	);
}

export default ValidateToken;
