function Categorias({ categorias, text, toSelect, stock, err, event, value }) {
	return (
		<>
			<section className="flex flex-col gap-2">
				<h2 className="font-bold text-[#262629d7] text-[1.05rem]">{text}</h2>
				<select
					name="categorias"
					id="categorias"
					className="w-full outline-none border border-gray-300 p-1 rounded ring-1 ring-gray-300 focus:ring-blue-500"
					onChange={event}
					defaultValue={value}
				>
					{<option value="">--Escoja una {toSelect}--</option>}
					{categorias.map((cat, i) => {
						return (
							<option key={i} value={stock ? cat.toLowerCase() : (i += 1)}>
								{cat}
							</option>
						);
					})}
				</select>
				{err && <p className="text-sm text-red-500">{err}</p>}
			</section>
		</>
	);
}

export default Categorias;
