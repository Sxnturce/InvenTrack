import Row from "./RowReport";

function PaginationReport({ currentItems, arr, report }) {
	return (
		<>
			{currentItems &&
				currentItems.map((product) => (
					<Row
						key={product.id}
						product={product.nombre}
						tipo={product.tipo_id}
						id={product.id}
						stock={product.estado_stock}
						arr={arr}
						report={report}
					/>
				))}
		</>
	);
}

export default PaginationReport;
