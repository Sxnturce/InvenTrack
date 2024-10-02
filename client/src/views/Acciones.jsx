import Icon from "../components/dashboard/partials/Icon";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Query from "../helpers/Querys.js";
import Row from "../components/dashboard/tablePartial/RowReport";
import PaginateCount from "../components/dashboard/tablePartial/PaginateCount";
import AlertReport from "../helpers/alerts/AlertReport.js";
import Alert from "../helpers/alerts/Alert.js";
import { AuthContext } from "../context/authContext";
import Searcher from "../components/dashboard/partials/Searcher";

function Acciones() {
	const [products, setProducts] = useState([]);
	const [itemOffset, setItemOffset] = useState(0);
	const location = useLocation();
	const [toSearch, setToSearch] = useState("");
	const itemsPerPage = 12;
	const navigate = useNavigate();

	const { user } = useContext(AuthContext);

	useEffect(() => {
		const { venta } = location.state || {};
		if (venta) {
			Alert("Venta Existosa", "Su venta fue realizada con exito", true, true);
		}
	}, []);

	useEffect(() => {
		async function getData() {
			try {
				const productos = await Query.getData("all-products");
				setProducts(productos.data);
			} catch (e) {
				navigate("/", { state: { caduced: true } });
			}
		}
		getData();
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

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % data.length;
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

	function handleSearch(e) {
		setToSearch(e.target.value);
	}

	return (
		<>
			<section className="flex justify-between items-center mb-10 flex-col gap-6  sm:flex-row sm:gap-2">
				<div className="flex gap-4 items-center ">
					<Icon ico={faBox} type={"Categoria"} />
					<h1 className="text-[#525252] text-xl">Acciones</h1>
				</div>
				<Searcher event={handleSearch} value={toSearch} />
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
						{currentItems &&
							currentItems.map((product) => (
								<Row
									key={product.id}
									product={product.nombre}
									tipo={product.tipos.nombre}
									id={product.id}
									stock={product.estado_stock}
									report={handleReport}
								/>
							))}
					</tbody>
				</table>
			</section>
			<PaginateCount pageCount={pageCount} handlePageClick={handlePageClick} />
		</>
	);
}

export default Acciones;
