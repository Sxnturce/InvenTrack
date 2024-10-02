import Icon from "../components/dashboard/partials/Icon";
import { faTableList } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Row from "../components/dashboard/tablePartial/RowVentas";
import PaginateCount from "../components/dashboard/tablePartial/PaginateCount";
import Searcher from "../components/dashboard/partials/Searcher";
import ParseDate from "../helpers/ParseDate.js";
import Query from "../helpers/Querys";
import { useNavigate } from "react-router-dom";

function Ventas() {
	const [data, setData] = useState([]);
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 10;
	const [toSearch, setToSearch] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		async function getVentas() {
			try {
				const ventas = await Query.getData("ventas");
				setData(ventas.data.reverse());
			} catch (e) {
				navigate("/", { state: { caduced: true } });
			}
		}
		getVentas();
	}, []);

	let ventas = [];

	if (!toSearch) {
		ventas = data;
	} else {
		ventas = data.filter((product) => {
			return product.producto.nombre.toLowerCase().includes(toSearch);
		});
	}

	const endOffset = itemOffset + itemsPerPage;
	const currentItems = ventas.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(ventas.length / itemsPerPage);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % ventas.length;
		setItemOffset(newOffset);
	};

	function handleSearch(e) {
		setToSearch(e.target.value);
	}

	return (
		<>
			<section className="flex justify-between items-center mb-10 flex-col gap-6  sm:flex-row sm:gap-2">
				<div className="flex gap-4 items-center ">
					<Icon ico={faTableList} type={"Ventas"} />
					<h1 className="text-[#525252] text-xl">Historial de ventas</h1>
				</div>
				<Searcher event={handleSearch} value={toSearch} />
			</section>
			<section className="w-full overflow-x-auto lg:overflow-hidden">
				<table className="w-full bg-white border border-gray-200 rounded-lg min-w-[800px] shadow">
					<thead className=" text-gray-900 bg-emerald-200 text-left">
						<tr className="ventas">
							<th className="p-4 font-semibold">#</th>
							<th className="p-4 font-semibold">Usuario</th>
							<th className="p-4 font-semibold">Producto</th>
							<th className="p-4 font-semibold">Cantidad</th>
							<th className="p-4 font-semibold">Total Venta</th>
							<th className="p-4 font-semibold">Fecha Venta</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{currentItems &&
							currentItems.map((venta) => (
								<Row
									key={venta.id}
									usuario={venta.usuario.nombre_usuario}
									product={venta.producto.nombre}
									cantidad={venta.cantidad}
									id={venta.id}
									total_venta={venta.total_venta}
									fecha_venta={ParseDate(venta.fecha_venta)}
								/>
							))}
					</tbody>
				</table>
			</section>
			<PaginateCount pageCount={pageCount} handlePageClick={handlePageClick} />
		</>
	);
}

export default Ventas;
