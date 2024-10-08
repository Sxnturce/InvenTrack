import { Link } from "react-router-dom";
function RowReport({ product, tipo, stock, id, report, spinner }) {
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
						data-report={id}
						onClick={report}
						className="py-1 px-2 rounded mr-4 bg-amber-500 text-white  text-sm text-center hover:bg-amber-600 transition-colors ease-in-out"
					>
						Generar Reporte
					</button>
					{+spinner.id === id && <span className="spinner-form-small"></span>}
				</td>
				<td>
					<Link
						data-sell={id}
						to={`/admin/vender-product/${id}`}
						className="py-1 px-2 rounded bg-blue-500 text-white  text-sm text-center hover:bg-blue-600 transition-colors ease-in-out"
					>
						Vender
					</Link>
				</td>
			</tr>
		</>
	);
}

export default RowReport;
