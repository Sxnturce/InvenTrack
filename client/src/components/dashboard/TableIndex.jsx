import Row from "./tablePartial/RowIndex";
import Icon from "./partials/Icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faAdd } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function TableIndex() {
	return (
		<>
			<section className="flex justify-between items-center mt-10">
				<div className="flex gap-4 items-center ">
					<Icon ico={faBox} type={"Categoria"} />
					<h1 className="text-[#525252] text-xl">Productos en el almacen</h1>
				</div>
				<Link
					to={"/admin/crear-producto"}
					className="flex items-center justify-center px-3 py-[0.5rem] bg-green-500 hover:bg-green-600 transition-all ease-in-out text-white text-[1rem] rounded shadow"
				>
					<FontAwesomeIcon icon={faAdd} className="mr-2" />
					Add product
				</Link>
			</section>
			<section className="w-full overflow-x-auto">
				<table className="w-full bg-white border border-gray-200 rounded-lg min-w-[800px] shadow">
					<thead className=" text-gray-900 bg-[#f7f7f7] text-left">
						<tr>
							<th className="p-4 font-semibold">#</th>
							<th className="p-4 font-semibold">Nombre</th>
							<th className="p-4 font-semibold">Tipo</th>
							<th className="p-4 font-semibold">Estado</th>
							<th className="p-4 font-semibold">Cantidad en Stock</th>
							<th className="p-4 font-semibold">Acciones</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						<Row
							product={"Lentes Oscuro"}
							tipo={"Hogar"}
							cantidad={50}
							id={1}
							estado={"Adecuado"}
						/>
						<Row
							product={"Horno"}
							tipo={"Electronico"}
							cantidad={50}
							id={2}
							estado={"Bajo"}
						/>
						<Row
							product={"Audifonos"}
							tipo={"Gamer"}
							cantidad={20}
							id={3}
							estado={"Suficiente"}
						/>
						<Row
							product={"Mueble"}
							tipo={"Hogar"}
							cantidad={100}
							id={4}
							estado={"Bajo"}
						/>
					</tbody>
				</table>
			</section>
		</>
	);
}

export default TableIndex;
