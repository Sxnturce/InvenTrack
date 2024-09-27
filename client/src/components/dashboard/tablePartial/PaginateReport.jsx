import Row from "./RowReport";

function PaginationReport({ currentItems }) {
	return (
		<>
			{currentItems &&
				currentItems.map((bird) => (
					<Row
						key={bird.id}
						product={bird.name}
						tipo={bird.diet}
						id={bird.id}
						stock={"Adecuado"}
					/>
				))}
		</>
	);
}

export default PaginationReport;
