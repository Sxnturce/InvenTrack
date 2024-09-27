import { useState } from "react";

function RowVentas({
	product,
	usuario,
	id,
	cantidad,
	fecha_venta,
	total_venta,
}) {
	return (
		<>
			<tr className="border-b border ventas">
				<td className="p-3">{id}</td>
				<td className="p-3">{usuario}</td>
				<td className="p-3">{product}</td>
				<td className="p-3">{cantidad}</td>
				<td className="p-3">{fecha_venta}</td>
				<td className="p-3">{total_venta}</td>
			</tr>
		</>
	);
}

export default RowVentas;
