function RowReport({ product, tipo, stock, id }) {
	const stateStock =
		stock === "Bajo"
			? "bg-gray-500"
			: stock === "Adecuado"
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
						className={`${stateStock} px-2 py-[0.20rem] rounded-lg max-w-max text-xs text-white text-center`}
					>
						{stock}
					</p>
				</td>
				<td>
					<button
						data-id={id}
						className="py-1 px-2 rounded bg-amber-500 text-white  text-sm text-center"
					>
						Generar Reporte
					</button>
				</td>
				<td>
					<button
						data-id={id}
						className="py-1 px-2 rounded bg-blue-500 text-white  text-sm text-center"
					>
						Vender
					</button>
				</td>
			</tr>
		</>
	);
}

export default RowReport;
