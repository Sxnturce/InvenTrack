function Popup({ img, name, cantidad, position, dinero, children }) {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
			<div className="relative w-full max-w-md bg-white rounded-lg shadow-lg transform transition-all p-6">
				<button
					type="button"
					className="absolute top-3 right-3 text-gray-400 hover:text-gray-500 focus:outline-none"
				>
					<svg
						className="w-6 h-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				<div className="flex flex-col items-center space-y-4">
					<span
						className={`px-4 py-1 rounded-full text-white text-sm font-semibold ${
							position === "1"
								? "bg-yellow-500"
								: position === "2"
								? "bg-gray-400"
								: "bg-yellow-700"
						}`}
					>
						#{position} en el podio
					</span>

					<img
						src={img}
						alt={`Foto de ${name}`}
						className="w-24 h-24 rounded-full object-cover border-4 border-green-500"
					/>

					<div className="text-center flex flex-col gap-3">
						<h3 className="text-2xl font-bold text-gray-900">{name}</h3>
						<div>
							<p className="text-gray-600">Productos vendidos: {cantidad}</p>
							<p className="text-gray-600">
								Dinero generado: S/.{dinero.toLocaleString()}
							</p>
						</div>
					</div>
				</div>
				<div className="mt-6 flex justify-center">{children}</div>
			</div>
		</div>
	);
}

export default Popup;
