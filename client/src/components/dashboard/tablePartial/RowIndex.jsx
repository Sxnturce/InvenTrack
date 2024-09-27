function RowIndex({ product, tipo, estado, cantidad, id }) {
	const stateStock =
		estado === "Bajo"
			? "bg-gray-500"
			: estado === "Adecuado"
			? "bg-green-400"
			: "bg-sky-500";
	return (
		<>
			<tr className="border-b border">
				<td className="p-3">{id}</td>
				<td className="p-3">{product}</td>
				<td className="p-3">{tipo}</td>
				<td className="p-3">
					<p
						className={`${stateStock} px-2 py-1 rounded-lg max-w-max text-xs text-white text-center`}
					>
						{estado}
					</p>
				</td>
				<td className="p-3">{cantidad} ud.</td>
				<td className="p-3 flex gap-4">
					<button
						data-id={id}
						className="py-1 px-2 rounded bg-yellow-600 text-white  text-sm text-center"
					>
						Editar
					</button>
					<button
						delete-id={id}
						className="py-1 px-2 rounded bg-red-600 text-white text-center text-sm"
					>
						Eliminar
					</button>
				</td>
			</tr>
		</>
	);
}

export default RowIndex;
