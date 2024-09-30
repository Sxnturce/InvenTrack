function Searcher({ event, value, text }) {
	return (
		<>
			<form className="flex items-center  justify-center gap-4">
				{text && <h1 className="text-xl text-[#525252]">{text}</h1>}
				<input
					onChange={event}
					value={value}
					type="text"
					placeholder="Buscar producto"
					className="py-1 px-2 border-2 ring-1 focus:ring-2 w-[250px] outline-none rounded"
				/>
			</form>
		</>
	);
}

export default Searcher;
