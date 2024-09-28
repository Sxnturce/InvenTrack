function Button({ value, type }) {
	const currentColor =
		type === "crear"
			? "bg-green-500 hover:bg-green-700 transition-colors ease-in-out"
			: type === "editar"
			? "bg-amber-500 hover:bg-amber-600 transition-colors ease-in-out"
			: type === "vender"
			? "bg-blue-500 hover:bg-blue-600 transition-colors ease-in-out"
			: "bg-color-main button-pushed";
	return (
		<>
			<input
				type="submit"
				value={value}
				className={`${currentColor} cursor-pointer text-white font-bold p-2 rounded-sm `}
			/>
		</>
	);
}

export default Button;
