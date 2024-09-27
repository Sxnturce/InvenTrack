import Row from "./RowSolicitud";

function PaginationSolicitud({ currentItems }) {
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
						estado={"Pendiente"}
						fecha={fecha}
					/>
				))}
		</>
	);
}

export default PaginationSolicitud;
