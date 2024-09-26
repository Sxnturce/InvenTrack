import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function LinkSidebar({ text, to, icon }) {
	return (
		<>
			<NavLink
				to={to}
				className={({ isActive }) =>
					`w-full text-white flex justify-between items-center px-2 py-3 rounded text-[0.90rem] ${
						isActive ? "bg-white/5 font-medium" : ""
					}`
				}
			>
				{text}
				<FontAwesomeIcon icon={icon} />
			</NavLink>
		</>
	);
}

export default LinkSidebar;
