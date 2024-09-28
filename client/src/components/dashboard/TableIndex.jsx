import Icon from "./partials/Icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faAdd } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "./tablePartial/PaginateView";
import PaginateCount from "./tablePartial/PaginateCount";

function TableIndex() {
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
			<section className="flex justify-between items-center mt-10">
				<div className="flex gap-4 items-center ">
					<Icon ico={faBox} type={"Categoria"} />
					<h1 className="text-[#525252] text-xl">Productos en el almacen</h1>
				</div>
				<Link
					to={"/admin/product"}
					className="flex items-center justify-center px-3 py-[0.5rem] bg-green-500 hover:bg-green-600 transition-all ease-in-out text-white text-[1rem] rounded shadow"
				>
					<FontAwesomeIcon icon={faAdd} className="mr-2" />
					Add product
				</Link>
			</section>
			<section className="w-full overflow-x-auto lg:overflow-hidden">
				<table className="w-full bg-white border border-gray-200 rounded-lg min-w-[800px] shadow">
					<thead className=" text-gray-900 bg-[#f7f7f7] text-left">
						<tr>
							<th className="p-4 font-semibold">#</th>
							<th className="p-4 font-semibold">Nombre</th>
							<th className="p-4 font-semibold">Tipo</th>
							<th className="p-4 font-semibold">Stock</th>
							<th className="p-4 font-semibold">Cantidad en Stock</th>
							<th className="p-4 font-semibold">Acciones</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						<Pagination currentItems={currentItems} />
					</tbody>
				</table>
			</section>
			<PaginateCount pageCount={pageCount} handlePageClick={handlePageClick} />
		</>
	);
}

export default TableIndex;
