import Row from "./RowVentas";

function PaginationVentas({ currentItems }) {
	const fecha = new Date().getFullYear();
	return (
		<>
			{currentItems &&
				currentItems.map((bird) => (
					<Row
						key={bird.id}
						usuario={bird.diet}
						product={bird.name}
						cantidad={30}
						id={bird.id}
						total_venta={500}
						fecha_venta={fecha}
					/>
				))}
		</>
	);
}

export default PaginationVentas;
