import { useState } from "react";

function RowReport({ product, usuario, estado, id, cantidad, fecha }) {
	const states = ["enviado", "entregado", "pendiente"];
	return (
		<>
			<tr className="border-b border solicitud">
				<td className="p-2">{id}</td>
				<td className="p-2">{usuario}</td>
				<td className="p-2">{product}</td>
				<td className="p-2">
					<select
						name="estado"
						id="estado"
						defaultValue={estado.toLowerCase()}
						className="py-[0.22rem] px-2 rounded border-2 border-gray-200 outline-none focus:ring-2 text-sm"
					>
						{states.map((state, index) => {
							return (
								<option key={index} value={state}>
									{state}
								</option>
							);
						})}
					</select>
				</td>
				<td className="p-2">{cantidad}</td>
				<td className="p-2">{fecha}</td>
			</tr>
		</>
	);
}

export default RowReport;
