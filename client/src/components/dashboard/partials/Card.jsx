function Card({ title, tipo, price, time, name, children }) {
	const colorCurrent =
		tipo === "Categoria"
			? "text-orange-400"
			: tipo === "Producto"
			? "text-blue-400"
			: "text-green-500";

	return (
		<>
			<div className="w-full bg-white px-4 py-6 rounded shadow-sm flex flex-col gap-2">
				<h1 className={`${colorCurrent} font-extrabold text-2xl`}>{title}</h1>
				<div className="flex justify-between items-center">
					<div className="flex gap-2 items-center">
						<p className="text-[1.2rem] text-gray-500">
							{name ? name : "Tus ventas"}:
						</p>
						<p className={`font-bold ${colorCurrent} text-[0.99rem]`}>
							S/ {price}
						</p>
					</div>
					{children}
				</div>
				<hr />
				<footer className="flex justify-between">
					<h2 className="text-gray-500">Ultima Actualizacion</h2>
					<p>{time}</p>
				</footer>
			</div>
		</>
	);
}

export default Card;
