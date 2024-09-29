import Icon from "./partials/Icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faAdd } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "./tablePartial/PaginateView";
import PaginateCount from "./tablePartial/PaginateCount";
import Query from "../../helpers/Querys.js";
import AlertDelete from "../../helpers/alerts/AlertDelete.js";

function TableIndex() {
	const [tipes, setTipos] = useState([]);
	const [products, setProducts] = useState([]);
	const [itemOffset, setItemOffset] = useState(0);
	const navigate = useNavigate();
	const itemsPerPage = 10;

	useEffect(() => {
		async function getTipos() {
			try {
				const tipos = await Query.getData("all-tipes");
				const productos = await Query.getData("all-products");
				setProducts(productos.data);
				setTipos(tipos.data);
			} catch (e) {
				console.log(e);
			}
		}
		getTipos();
	}, []);
	const endOffset = itemOffset + itemsPerPage;
	const currentItems = products.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(products.length / itemsPerPage);

	async function handleDelete({ target }) {
		const id = target.getAttribute("data-id");
		const result = await AlertDelete();

		if (result) {
			try {
				await Query.deleteProduct(`product/${id}`);
				const tr = target.closest("tr");
				tr.remove();
			} catch (e) {
				console.log(e);
			}
		}
	}
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % products.length;
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
							<th className="p-4 font-semibold" slot="#">
								#
							</th>
							<th className="p-4 font-semibold">Nombre</th>
							<th className="p-4 font-semibold">Tipo</th>
							<th className="p-4 font-semibold">Stock</th>
							<th className="p-4 font-semibold">Cantidad en Stock</th>
							<th className="p-4 font-semibold">Acciones</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						<Pagination
							currentItems={currentItems}
							tipes={tipes}
							del={handleDelete}
						/>
					</tbody>
				</table>
			</section>
			<PaginateCount pageCount={pageCount} handlePageClick={handlePageClick} />
		</>
	);
}

export default TableIndex;
