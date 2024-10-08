import Icon from "../components/dashboard/partials/Icon";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Row from "../components/dashboard/tablePartial/RowSolicitud";
import Query from "../helpers/Querys.js";
import PaginateCount from "../components/dashboard/tablePartial/PaginateCount";
import ParseDate from "../helpers/ParseDate.js";
import { partialPedidoValidate } from "../validate/pedidoValidate";
import AlertSmall from "../helpers/alerts/AlertSmallError.js";
import alertSmallSuccess from "../helpers/alerts/AlertSmallSuccess.js";
import Searcher from "../components/dashboard/partials/Searcher";
import { useNavigate } from "react-router-dom";

function Solicitud() {
	const [data, setData] = useState([]);
	const [itemOffset, setItemOffset] = useState(0);
	const [loading, setLoading] = useState(true);
	const [spinner, setSpinner] = useState({ id: null });
	const itemsPerPage = 10;
	const [toSearch, setToSearch] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		async function getReports() {
			try {
				const result = await Query.getData("reports");
				setData(result.data);
			} catch (e) {
				navigate("/", { state: { caduced: true } });
			} finally {
				setLoading(false);
			}
		}
		getReports();
	}, []);

	let solicitudes = [];

	if (!toSearch) {
		solicitudes = data;
	} else {
		solicitudes = data.filter((product) => {
			return product.producto.nombre.toLowerCase().includes(toSearch);
		});
	}

	const endOffset = itemOffset + itemsPerPage;
	const currentItems = solicitudes.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(solicitudes.length / itemsPerPage);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % solicitudes.length;
		setItemOffset(newOffset);
	};

	async function handleChange({ target }) {
		const value = target.value;
		const id = target.closest("select").getAttribute("data-id");
		setSpinner({ id: id });
		const result = partialPedidoValidate({ estado_envio: value });

		if (!result.success) {
			AlertSmall("Ocurrio un error");
			setSpinner({ id: null });
			return;
		}
		try {
			await Query.updateReport(`generar-pedido/${id}`, result.data);
			setSpinner({ id: null });
			alertSmallSuccess();
		} catch (e) {
			AlertSmall("Ocurrio un error");
			setSpinner({ id: null });
		}
	}

	function handleSearch(e) {
		setToSearch(e.target.value);
	}
	return (
		<>
			<section className="flex justify-between items-center mb-10 flex-col gap-6  sm:flex-row sm:gap-2">
				<div className="flex gap-4 items-center ">
					<Icon ico={faBuilding} type={"Solicitud"} />
					<h1 className="text-[#525252] text-xl">Solicitudes de productos</h1>
				</div>
				<Searcher event={handleSearch} value={toSearch} />
			</section>
			{loading ? (
				<span className="loader block"></span>
			) : (
				<>
					<section className="w-full overflow-x-auto lg:overflow-hidden">
						<table className="w-full bg-white border border-gray-200 rounded-lg min-w-[800px] shadow">
							<thead className=" text-gray-900 bg-[#f3f3ff] text-left">
								<tr className="solicitud">
									<th className="p-4 font-semibold">#</th>
									<th className="p-4 font-semibold">Usuario</th>
									<th className="p-4 font-semibold">Producto</th>
									<th className="p-4 font-semibold">Estado</th>
									<th className="p-4 font-semibold">Cantidad</th>
									<th className="p-4 font-semibold">Fecha</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{currentItems &&
									currentItems
										.reverse()
										.map((report, i) => (
											<Row
												key={report.id}
												usuario={report.usuario.nombre_usuario}
												product={report.producto.nombre}
												cantidad={report.cantidad}
												order={i + 1}
												id={report.id}
												estado={report.estado_envio}
												fecha={ParseDate(report.fecha_pedido)}
												event={handleChange}
												spinner={spinner}
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

export default Solicitud;
