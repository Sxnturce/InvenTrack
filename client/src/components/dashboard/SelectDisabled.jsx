import { useMemo } from "react";
function SelectedDisabled({ err, value, id, text, arr = [] }) {
	const typeMap = useMemo(() => {
		return arr.reduce((acc, item) => {
			acc[item.id] = item.nombre;
			return acc;
		}, {});
	}, [arr]);
	return (
		<>
			<h2 className="font-bold text-[#262629d7] text-[1.05rem]">{text}</h2>
			<select
				name="categorias"
				id="categorias"
				className="w-full outline-none border border-gray-300 p-1 rounded ring-1 ring-gray-300 focus:ring-blue-500"
				disabled
			>
				<option value={id}>{arr.length > 0 ? typeMap[value] : value}</option>
			</select>
			{err && <p className="text-sm text-red-500">{err}</p>}
		</>
	);
}

export default SelectedDisabled;
