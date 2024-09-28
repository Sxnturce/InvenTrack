import Input from "../components/dashboard/Input";
import Selected from "../components/dashboard/Selected";
import Button from "../components/auth/partials/Button";
import { useParams } from "react-router-dom";
import Icon from "../components/dashboard/partials/Icon";
import AlertQuestion from "../helpers/alerts/AlertQuestion.js";
import {
	faCartShopping,
	faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { ventaValidate } from "../../../server/schemes/VentaValidate.js";
import { useState, useEffect } from "react";

function VenderProducto() {
	const [producto, setProducto] = useState("");
	const [tipo, setTipo] = useState("");
	const [cantidad, setCantidad] = useState("");
	const [tienda, setTienda] = useState("");

	const [productoErr, setProductoErr] = useState("");
	const [tipoErr, setTipoErr] = useState("");
	const [cantidadErr, setCantidadErr] = useState("");
	const [tiendaErr, setTiendaErr] = useState("");

	const tiendas = [
		"Impresiones SAC",
		"Empresa Mecatronica",
		"Google enterprise",
	];
	const tipos = ["Mueble", "Electrico", "Juguete", "Gamer", "Moda"];
	const productos = ["Oso", "Mueble", "Galleta"];

	const { id } = useParams();

	useEffect(() => {
		setProducto(2);
		setTipo(3);
	}, []);

	useEffect(() => {
		setProductoErr("");
		setTipoErr("");
		setCantidadErr("");
		setTiendaErr("");
	}, [producto, tipo, cantidad, tienda]);

	function handleSubmit(e) {
		e.preventDefault();

		const result = ventaValidate({
			usuario_id: 5,
			producto_id: producto,
			cantidad: Number(cantidad),
		});

		if (!result.success) {
			const { issues } = result.error;

			if (issues[0].path[0] === "usuario_id") {
				setProductoErr(issues[0].message);
				return;
			}

			if (issues[0].path[0] === "producto_id") {
				setProductoErr(issues[0].message);
				return;
			}

			if (issues[0].path[0] === "cantidad") {
				setCantidadErr(issues[0].message);
				return;
			}
		}
		if (!tienda) {
			setTiendaErr("Seleccione una tienda disponible.");
			return;
		}
		console.log("Todo bien");
	}

	function handleCount({ target: { value } }) {
		const sanitized = value.replace(/\D/g, "");
		setCantidad(sanitized);
	}

	return (
		<>
			<div className="flex gap-4 items-center text-[#525252]">
				<Icon ico={faCartShopping} type={"Solicitud"} />
				<h1 className="text-xl">Vender Producto - InvenTrack</h1>
			</div>
			<section className="w-full flex flex-col gap-6 max-w-[550px] bg-white rounded shadow px-6 py-4 mx-auto mt-8">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl text-blue-500 font-black ">
						Vender Producto
					</h1>
					<Icon
						ico={faQuestionCircle}
						type={"Solicitud"}
						pointer={true}
						event={() => {
							AlertQuestion(
								"Informacion adicional",
								"Algunas caracteristicas adicionales sobre este producto desde el Inventario.",
								50.5,
								100,
								"Bajo"
							);
						}}
					/>
				</div>
				<form
					method="post"
					className="flex flex-col gap-4"
					onSubmit={handleSubmit}
				>
					<Selected
						categorias={productos}
						text={"Producto"}
						err={productoErr}
						value={producto}
						event={(e) => {
							setTienda(e.target.value);
						}}
					/>
					<Selected
						categorias={tipos}
						text={"Categorias"}
						err={tipoErr}
						value={tipo}
						event={(e) => {
							setTienda(e.target.value);
						}}
					/>

					<Input
						text={"Cantidad del Producto"}
						name={"countProduct"}
						value={cantidad}
						errMsg={cantidadErr}
						event={handleCount}
					/>

					<Selected
						categorias={tiendas}
						text={"Tiendas disponibles"}
						toSelect={"tienda"}
						err={tiendaErr}
						value={tienda}
						tienda={true}
						event={(e) => {
							setTienda(e.target.value);
						}}
					/>
					<Button value={"Vender producto"} type={"vender"} />
				</form>
			</section>
		</>
	);
}

export default VenderProducto;
