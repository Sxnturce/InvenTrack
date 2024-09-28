import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function Input({ text, type, name, event, value, errMsg }) {
	return (
		<>
			<div className="flex flex-col gap-2">
				<label
					htmlFor={name}
					className="font-bold text-[#262629d7] text-[1.035rem]"
				>
					{text}
				</label>
				<div className="w-full flex items-center">
					<input
						className={`px-2 py-1 md:py-[0.4rem] ring-2 ring-gray-200 rounded outline-none  w-full focus:ring-blue-500`}
						type={type === "email" ? "email" : "text"}
						placeholder={`Ingrese el ${text.toLowerCase()}`}
						id={name}
						name={name}
						onChange={event}
						value={value}
					/>
				</div>
				{errMsg && <p className="text-sm text-red-600">{errMsg}</p>}
			</div>
		</>
	);
}

export default Input;
