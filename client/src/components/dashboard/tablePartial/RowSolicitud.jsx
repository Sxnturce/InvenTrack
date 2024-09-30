function RowReport({ product, usuario, estado, id, cantidad, fecha, event }) {
	const states = ["enviado", "entregado", "pendiente"];
	const lower = estado.toLowerCase();

	const color =
		lower === "enviado"
			? "text-blue-600"
			: lower === "entregado"
			? "text-green-600"
			: "text-yellow-600";
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
						data-id={id}
						onChange={event}
						defaultValue={estado.toLowerCase()}
						className={`py-[0.22rem] px-2 rounded border-2 ${color} border-gray-200 outline-none focus:ring-2 text-sm cursor-pointer`}
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
				<td className="p-2">{cantidad} ud.</td>
				<td className="p-2">{fecha}</td>
			</tr>
		</>
	);
}

export default RowReport;
