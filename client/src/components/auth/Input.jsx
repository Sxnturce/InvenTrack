import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Input({
	text,
	type,
	name,
	repet,
	event,
	value,
	errMsg,
	code,
	length,
}) {
	const [state, setState] = useState(true);

	return (
		<>
			<div className="flex flex-col gap-2">
				<label htmlFor={name} className="font-bold text-[#262629] text-lg">
					{text}
				</label>
				<div className="relative w-full flex items-center">
					<input
						className={`px-2 py-1 md:py-[0.45rem] ring-2 ${
							code
								? length.length > 5
									? "focus:ring-green-500"
									: "focus:ring-red-500"
								: "focus:ring-[#434091]"
						} ring-gray-200 rounded outline-none  w-full `}
						type={
							type === "email"
								? "email"
								: type === "password" && state
								? "password"
								: "text"
						}
						placeholder={
							repet
								? "Repita su contraseña"
								: `Ingrese su ${text.toLowerCase()}`
						}
						id={name}
						name={name}
						onChange={event}
						value={value}
					/>
					{type === "password" && (
						<FontAwesomeIcon
							icon={state ? faEyeSlash : faEye}
							onClick={() => {
								setState(!state);
							}}
							className="cursor-pointer absolute right-3 p-1 text-gray-500"
						/>
					)}
				</div>
				{errMsg && <p className="text-sm text-red-600">{errMsg}</p>}
			</div>
		</>
	);
}

export default Input;
