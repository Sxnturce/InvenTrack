import {
	faHome,
	faCircleExclamation,
	faCartShopping,
	faClock,
	faClipboardList,
	faShield,
	faFilter,
	faRightFromBracket,
	faGear,
} from "@fortawesome/free-solid-svg-icons";
import LinkSidebar from "./partials/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Sidebar({ state }) {
	return (
		<>
			<aside
				className={`bg-color-main fixed w-full flex-shrink-0 flex-grow-0 basis-[250px] ${
					!state ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
				} transition-all ease-linear max-w-[250px] h-full px-2 py-4 `}
			>
				<section>
					<nav className="flex flex-col gap-12">
						<div className="flex flex-col gap-6 ">
							<h2 className="text-gray-400 text-sm">Navigation</h2>
							<ul className="flex flex-col gap-1">
								<LinkSidebar text={"Dashboard"} icon={faHome} to={"/admin"} />
								<LinkSidebar
									text={"Vender Producto"}
									icon={faCartShopping}
									to={"/admin/crear-producto"}
								/>
								<LinkSidebar
									text={"Categorias"}
									icon={faClipboardList}
									to={"/admin/categorias"}
								/>
								<LinkSidebar
									text={"Reporte Stock"}
									icon={faCircleExclamation}
									to={"/admin/reportes"}
								/>
								<LinkSidebar
									text={"Historial de Ventas"}
									icon={faClock}
									to={"/admin/ventas"}
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
