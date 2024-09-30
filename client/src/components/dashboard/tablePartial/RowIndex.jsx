import { Link } from "react-router-dom";

function RowIndex({ product, tipo, estado, cantidad, id, del }) {
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
					<Link
						to={`/admin/product/${id}`}
						className="py-1 px-2 rounded bg-amber-500 hover:bg-amber-600 transition-colors ease-in-out text-white  text-sm text-center"
					>
						Editar
					</Link>
					<button
						data-id={id}
						onClick={del}
						className="py-1 px-2 rounded bg-red-500 hover:bg-red-600 transition-colors ease-in-out text-white text-center text-sm"
					>
						Eliminar
					</button>
				</td>
			</tr>
		</>
	);
}

export default RowIndex;
