import {
	faGear,
	faRightFromBracket,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
function Options() {
	return (
		<>
			<div className="popup absolute bg-white w-[180px] -bottom-[140px] right-4 z-[5] shadow rounded p-4">
				<ul className="w-full flex flex-col gap-4">
					<Link className="flex gap-2 items-center justify-between text-gray-500 hover:text-black hover:font-semibold transition-all ease-in-out">
						Configuracion
						<FontAwesomeIcon icon={faGear} />
					</Link>
					<Link className="flex gap-2 items-center justify-between text-gray-500 hover:text-black hover:font-semibold transition-all ease-in-out">
						Usuario
						<FontAwesomeIcon icon={faUser} />
					</Link>
					<button className="flex gap-2 items-center justify-between text-gray-500 hover:text-black hover:font-semibold transition-all ease-in-out">
						Salir
						<FontAwesomeIcon icon={faRightFromBracket} />
					</button>
				</ul>
			</div>
		</>
	);
}

export default Options;
