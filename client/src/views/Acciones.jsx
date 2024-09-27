import Icon from "../components/dashboard/partials/Icon";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import PaginationReport from "../components/dashboard/tablePartial/PaginateReport";
import PaginateCount from "../components/dashboard/tablePartial/PaginateCount";

function Acciones() {
	const [data, setData] = useState([]);
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 12;

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
					<Icon ico={faBox} type={"Categoria"} />
					<h1 className="text-[#525252] text-xl">Acciones</h1>
				</div>
			</section>
			<section className="w-full overflow-x-auto lg:overflow-hidden">
				<table className="w-full bg-white border border-gray-200 rounded-lg min-w-[800px] shadow">
					<thead className=" text-gray-900 bg-[#f7f7f7] text-left">
						<tr>
							<th className="p-4 font-semibold">#</th>
							<th className="p-4 font-semibold">Nombre</th>
							<th className="p-4 font-semibold">Tipo</th>
							<th className="p-4 font-semibold">Stock</th>
							<th className="p-4 font-semibold">Reporte</th>
							<th className="p-4 font-semibold">Vender</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						<PaginationReport currentItems={currentItems} />
					</tbody>
				</table>
			</section>
			<PaginateCount pageCount={pageCount} handlePageClick={handlePageClick} />
		</>
	);
}

export default Acciones;
