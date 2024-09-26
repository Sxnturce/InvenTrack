import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Icon({ ico, type }) {
	return (
		<>
			<div
				className={`${
					type === "Categoria"
						? "bg-orange-400"
						: type === "Producto"
						? "bg-blue-400"
						: type === "Seller"
						? "bg-color-main"
						: "bg-green-500"
				} text-white px-3 py-2 rounded`}
			>
				<FontAwesomeIcon icon={ico} />
			</div>
		</>
	);
}

export default Icon;
