import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function LinkSidebar({ text, to, icon, end }) {
	return (
		<>
			<NavLink
				to={to}
				end={end}
				className={({ isActive }) =>
					`w-full text-white flex justify-between items-center px-2 py-3 rounded text-[0.90rem] transition-all ease-in-out ${
						isActive ? "bg-white/5 font-medium" : null
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
