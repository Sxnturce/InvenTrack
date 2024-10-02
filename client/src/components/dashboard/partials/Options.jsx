import {
	faGear,
	faRightFromBracket,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import clientAxios from "../../../config/Axios";
import AlertLogout from "../../../helpers/alerts/AlertLogout";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
function Options() {
	const navigate = useNavigate();
	const { setAuth } = useContext(AuthContext);
	async function handleClick() {
		const result = await AlertLogout();
		if (result) {
			try {
				const result = await clientAxios.post(
					"admin/dashboard/logout",
					{},
					{
						withCredentials: true,
					}
				);
				if (result.status === 200) {
					setAuth(false);
					return navigate("/");
				}
			} catch (e) {
				console.log(e);
			}
		}
	}
	return (
		<>
			<div className="popup absolute bg-white w-[180px] -bottom-[140px] right-4 z-[5] shadow rounded p-4">
				<ul className="w-full flex flex-col gap-4">
					<Link className="flex gap-2 items-center justify-between text-gray-500 hover:text-black hover:font-semibold transition-all ease-in-out">
						Configuracion
						<FontAwesomeIcon icon={faGear} />
					</Link>
					<Link className="flex gap-2 items-center justify-between text-gray-500 hover:text-black hover:font-semibold transition-all ease-in-out">
						Perfil
						<FontAwesomeIcon icon={faUser} />
					</Link>
					<button
						className="flex gap-2 items-center justify-between text-gray-500 hover:text-black hover:font-semibold transition-all ease-in-out"
						onClick={handleClick}
					>
						Salir
						<FontAwesomeIcon icon={faRightFromBracket} />
					</button>
				</ul>
			</div>
		</>
	);
}

export default Options;
