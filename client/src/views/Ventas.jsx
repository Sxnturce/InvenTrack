import Icon from "../components/dashboard/partials/Icon";
import { faTableList } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import PaginationVentas from "../components/dashboard/tablePartial/PaginateVentas";
import PaginateCount from "../components/dashboard/tablePartial/PaginateCount";

function Ventas() {
	const [data, setData] = useState([]);
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 10;

	useEffect(() => {
		const url = "https://freetestapi.com/api/v1/birds?limit=30";
		async function getData() {
			const result = await fetch(url);
			const birds = await result.json();
			setData(birds);
		}
		getData();
	}, []);

	const endOffset = itemOffset + itemsPerPage;
	const currentItems = data.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(data.length / itemsPerPage);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % data.length;
		setItemOffset(newOffset);
	};

	return (
		<>
			<section className="flex justify-between items-center mb-10">
				<div className="flex gap-4 items-center ">
					<Icon ico={faTableList} type={"Ventas"} />
					<h1 className="text-[#525252] text-xl">Historial de ventas</h1>
				</div>
			</section>
			<section className="w-full overflow-x-auto lg:overflow-hidden">
				<table className="w-full bg-white border border-gray-200 rounded-lg min-w-[800px] shadow">
					<thead className=" text-gray-900 bg-emerald-200 text-left">
						<tr className="ventas">
							<th className="p-4 font-semibold">#</th>
							<th className="p-4 font-semibold">Usuario</th>
							<th className="p-4 font-semibold">Producto</th>
							<th className="p-4 font-semibold">Cantidad</th>
							<th className="p-4 font-semibold">Fecha Venta</th>
							<th className="p-4 font-semibold">Total Venta</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						<PaginationVentas currentItems={currentItems} />
					</tbody>
				</table>
			</section>
			<PaginateCount pageCount={pageCount} handlePageClick={handlePageClick} />
		</>
	);
}

export default Ventas;
