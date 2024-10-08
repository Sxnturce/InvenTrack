import {
	faHome,
	faClock,
	faClipboardList,
	faShield,
	faFilter,
	faRightFromBracket,
	faGear,
	faBuildingLock,
} from "@fortawesome/free-solid-svg-icons";
import LinkSidebar from "./partials/Link";
import clientAxios from "../../config/Axios";
import AlertLogout from "../../helpers/alerts/AlertLogout";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function Sidebar({ state }) {
	const { setAuth } = useContext(AuthContext);
	const navigate = useNavigate();

	async function logout() {
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
			<aside
				className={`bg-color-main px-4 fixed w-full flex-shrink-0 flex-grow-0 basis-[250px] ${
					!state
						? "-translate-x-full opacity-0  lg:translate-x-0 lg:opacity-100"
						: "lg:-translate-x-full lg:opacity-0  translate-x-0 opacity-100"
				} transition-all ease-linear max-w-[250px] h-full px-2 py-4 `}
			>
				<section>
					<nav className="flex flex-col gap-12">
						<div className="flex flex-col gap-6 ">
							<h2 className="text-gray-400 text-sm">Navigation</h2>
							<ul className="flex flex-col gap-1">
								<LinkSidebar
									text={"Dashboard"}
									icon={faHome}
									to={"/admin"}
									end={"/"}
								/>
								<LinkSidebar
									text={"Acciones"}
									icon={faClipboardList}
									to={"/admin/actions"}
									end={"/actions"}
								/>
								<LinkSidebar
									text={"Solicitud de productos"}
									icon={faBuildingLock}
									to={"/admin/order-request"}
									end={"/order-request"}
								/>
								<LinkSidebar
									text={"Historial de Ventas"}
									icon={faClock}
									to={"/admin/lista-ventas"}
									end={"/lista-ventas"}
								/>
							</ul>
						</div>
						<div className="flex flex-col gap-6 ">
							<h2 className="text-gray-400 text-sm">Other</h2>
							<ul className="flex flex-col gap-1">
								<LinkSidebar
									text={"Authentication"}
									icon={faShield}
									to={"/admin/authentication"}
								/>
								<LinkSidebar
									text={"Extra"}
									icon={faFilter}
									to={"/admin/extra-widgets"}
								/>
								<LinkSidebar
									text={"Options"}
									icon={faGear}
									to={"/admin/options"}
								/>
								<button
									className={`w-full text-white flex justify-between items-center px-2 py-3 rounded text-[0.90rem]s`}
									onClick={logout}
								>
									Logout
									<FontAwesomeIcon icon={faRightFromBracket} />
								</button>
							</ul>
						</div>
					</nav>
				</section>
			</aside>
		</>
	);
}

export default Sidebar;
