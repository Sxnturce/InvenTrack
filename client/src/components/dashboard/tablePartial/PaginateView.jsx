import Row from "./RowIndex";

function Pagination({ currentItems }) {
	return (
		<>
			{currentItems &&
				currentItems.map((bird) => (
					<Row
						key={bird.id}
						product={bird.name}
						tipo={bird.diet}
						cantidad={bird.wingspan_cm}
						id={bird.id}
						estado={"Adecuado"}
					/>
				))}
		</>
	);
}

export default Pagination;
