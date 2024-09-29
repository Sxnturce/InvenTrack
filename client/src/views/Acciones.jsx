import Icon from "../components/dashboard/partials/Icon";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import Query from "../helpers/Querys.js";
import PaginationReport from "../components/dashboard/tablePartial/PaginateReport";
import PaginateCount from "../components/dashboard/tablePartial/PaginateCount";
import AlertReport from "../helpers/alerts/AlertReport.js";
import Alert from "../helpers/alerts/Alert.js";
import { AuthContext } from "../context/authContext";

function Acciones() {
	const [tipes, setTipos] = useState([]);
	const [products, setProducts] = useState([]);
	const [itemOffset, setItemOffset] = useState(0);
	const location = useLocation();
	const itemsPerPage = 12;

	const { user } = useContext(AuthContext);
	useEffect(() => {
		const { venta } = location.state || {};
		if (venta) {
			Alert("Venta Existosa", "Su venta fue realizada con exito", true, true);
		}
	}, []);

	useEffect(() => {
		async function getData() {
			const tipos = await Query.getData("all-tipes");
			const productos = await Query.getData("all-products");

			setTipos(tipos.data);
			setProducts(productos.data);
		}
		getData();
	}, []);

	const endOffset = itemOffset + itemsPerPage;
	const currentItems = products.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(products.length / itemsPerPage);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % products.length;
		setItemOffset(newOffset);
	};

	async function handleReport({ target }) {
		const id = target.getAttribute("data-report");
		const result = await AlertReport(id);
		if (result) {
			try {
				await Query.createReport("generar-pedido", {
					...result,
					usuario_id: user.id,
				});
				Alert("Reporte exitoso", "", true, true);
			} catch (e) {
				Alert(
					"Algo salio mal",
					"Ocurrio un error al intentar generar este reporte",
					false,
					true
				);
			}
		}
	}

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
						<PaginationReport
							currentItems={currentItems}
							arr={tipes}
							report={handleReport}
						/>
					</tbody>
				</table>
			</section>
			<PaginateCount pageCount={pageCount} handlePageClick={handlePageClick} />
		</>
	);
}

export default Acciones;
