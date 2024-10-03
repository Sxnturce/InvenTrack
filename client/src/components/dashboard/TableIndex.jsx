import Icon from "./partials/Icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faAdd } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PaginateCount from "./tablePartial/PaginateCount";
import Query from "../../helpers/Querys.js";
import AlertDelete from "../../helpers/alerts/AlertDelete.js";
import Row from "./tablePartial/RowIndex";
import Searcher from "./partials/Searcher";

function TableIndex() {
	const [products, setProducts] = useState([]);
	const [itemOffset, setItemOffset] = useState(0);
	const [toSearch, setToSearch] = useState("");
	const [loading, setLoading] = useState(true);
	const itemsPerPage = 10;

	useEffect(() => {
		async function getTipos() {
			try {
				const productos = await Query.getData("all-products");
				setProducts(productos.data);
			} catch (e) {
				console.log(e);
			} finally {
				setLoading(false);
			}
		}
		getTipos();
	}, []);

	let data = [];

	if (!toSearch) {
		data = products;
	} else {
		data = products.filter((product) => {
			return product.nombre.toLowerCase().includes(toSearch);
		});
	}

	const endOffset = itemOffset + itemsPerPage;
	const currentItems = data.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(data.length / itemsPerPage);

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
		const newOffset = (event.selected * itemsPerPage) % data.length;
		setItemOffset(newOffset);
	};

	function handleSearch(e) {
		setToSearch(e.target.value);
	}

	return (
		<>
			<section className="flex justify-center items-center mt-10 flex-wrap lg:justify-between flex-col gap-8 md:flex-row md:gap-2">
				<div className="flex gap-4 items-center flex-grow justify-start basis-0">
					<Icon ico={faBox} type={"Categoria"} />
					<h1 className="text-[#525252] text-xl">Productos en el almacen</h1>
				</div>
				<Searcher event={handleSearch} value={toSearch} />
				<div className="flex-grow flex justify-end basis-0">
					<Link
						to={"/admin/product"}
						className="flex items-center justify-center px-3 py-[0.5rem]  bg-green-500 hover:bg-green-600 transition-all ease-in-out text-white text-[1rem] rounded shadow"
					>
						<FontAwesomeIcon icon={faAdd} className="mr-2" />
						Add product
					</Link>
				</div>
			</section>
			{loading ? (
				<span className="loader"></span>
			) : (
				<>
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
								{currentItems &&
									currentItems.map((product) => (
										<Row
											key={product.id}
											product={product.nombre}
											tipo={product.tipos.nombre}
											cantidad={product.cantidad}
											id={product.id}
											estado={product.estado_stock}
											del={handleDelete}
										/>
									))}
							</tbody>
						</table>
					</section>
					<PaginateCount
						pageCount={pageCount}
						handlePageClick={handlePageClick}
					/>
				</>
			)}
		</>
	);
}

export default TableIndex;
