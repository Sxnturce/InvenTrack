import Row from "./RowIndex";
function Pagination({ currentItems, tipes, del }) {
	return (
		<>
			{currentItems &&
				currentItems.map((product) => (
					<Row
						key={product.id}
						product={product.nombre}
						tipo={product.tipo_id}
						cantidad={product.cantidad}
						id={product.id}
						estado={product.estado_stock}
						arr={tipes}
						del={del}
					/>
				))}
		</>
	);
}

export default Pagination;
