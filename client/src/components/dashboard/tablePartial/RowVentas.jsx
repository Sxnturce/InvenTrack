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
				<td className="p-3">{cantidad} ud.</td>
				<td className="p-3">S/ {total_venta}</td>
				<td className="p-3">{fecha_venta}</td>
			</tr>
		</>
	);
}

export default RowVentas;
