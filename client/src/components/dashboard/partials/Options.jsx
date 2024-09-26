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
			<div className="popup absolute bg-white w-[180px] -bottom-[165px] -left-20 z-[5] shadow rounded p-4">
				<ul className="w-full flex flex-col gap-4">
					<Link className="flex gap-2 items-center justify-between">
						Configuracion
						<FontAwesomeIcon icon={faGear} />
					</Link>
					<Link className="flex gap-2 items-center justify-between">
						Usuario
						<FontAwesomeIcon icon={faUser} />
					</Link>
					<button className="flex gap-2 items-center justify-between">
						Salir
						<FontAwesomeIcon icon={faRightFromBracket} />
					</button>
				</ul>
			</div>
		</>
	);
}

export default Options;
