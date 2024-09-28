import Input from "../components/dashboard/Input";
import Categorias from "../components/dashboard/Categorias";
import Button from "../components/auth/partials/Button";
import methodDecimal from "../helpers/MethodDecimal";
import Icon from "../components/dashboard/partials/Icon";
import { faP, faPlus } from "@fortawesome/free-solid-svg-icons";
import { productValidate } from "../validate/productoValidate.js";
import { useState, useEffect } from "react";

function CrearProducto() {
	const [nombre, setNombre] = useState("");
	const [tipo, setTipo] = useState("");
	const [cantidad, setCantidad] = useState("");
	const [precio, setPrecio] = useState("");
	const [stock, setStock] = useState("");

	const [nombreErr, setNombreErr] = useState("");
	const [tipoErr, setTipoErr] = useState("");
	const [cantidadErr, setCantidadErr] = useState("");
	const [precioErr, setPrecioErr] = useState("");
	const [stockErr, setStockErr] = useState("");

	const tipos = ["Mueble", "Electrico", "Juguete", "Gamer", "Moda"];
	const stockArr = ["Bajo", "Adecuado", "Suficiente"];

	useEffect(() => {
		setNombreErr("");
		setTipoErr("");
		setCantidadErr("");
		setPrecioErr("");
		setStockErr("");
	}, [nombre, tipo, cantidad, precio, stock]);

	function handleSubmit(e) {
		e.preventDefault();

		const result = productValidate({
			nombre: Number(nombre) ? Number(nombre) : nombre.trim(),
			tipo_id: Number(tipo),
			cantidad: Number(cantidad),
			precio: methodDecimal(Number(precio)),
			estado_stock: stock.trim(),
		});

		if (!result.success) {
			const { issues } = result.error;

			if (issues[0].path[0] === "nombre") {
				setNombreErr(issues[0].message);
				return;
			}

			if (issues[0].path[0] === "tipo_id") {
				setTipoErr("Seleccione una categoria disponible.");
				return;
			}

			if (issues[0].path[0] === "cantidad") {
				setCantidadErr(issues[0].message);
				return;
			}

			if (issues[0].path[0] === "precio") {
				setPrecioErr(issues[0].message);
				return;
			}
			if (issues[0].path[0] === "estado_stock") {
				setStockErr("Seleccione un stock disponible.");
				return;
			}
		}
		console.log("Todo bien");
	}

	function handleCount({ target: { value } }) {
		const sanitized = value.replace(/\D/g, "");
		setCantidad(sanitized);
	}

	function handlePrice({ target: { value } }) {
		const sanitized = value.replace(/[^0-9.]/g, "");
		setPrecio(sanitized);
	}

	return (
		<>
			<div className="flex gap-4 items-center text-[#525252]">
				<Icon ico={faPlus} />
				<h1 className="text-xl">Crear Producto - InvenTrack</h1>
			</div>
			<section className="w-full flex flex-col gap-6 max-w-[550px] bg-white rounded shadow px-6 py-4 mx-auto mt-8">
				<h1 className="text-3xl text-green-500 font-black ">Crear Producto</h1>
				<form
					method="post"
					className="flex flex-col gap-4"
					onSubmit={handleSubmit}
				>
					<Input
						text={"Nombre de producto"}
						name={"productName"}
						value={nombre}
						errMsg={nombreErr}
						event={(e) => {
							setNombre(e.target.value);
						}}
					/>
					<Categorias
						categorias={tipos}
						text={"Categorias"}
						toSelect={"categoria"}
						err={tipoErr}
						value={tipo}
						event={(e) => {
							setTipo(e.target.value);
						}}
					/>
					<Input
						text={"Cantidad del Producto"}
						name={"countProduct"}
						value={cantidad}
						errMsg={cantidadErr}
						event={handleCount}
					/>
					<Input
						text={"Precio del Producto"}
						name={"priceProduct"}
						value={precio}
						errMsg={precioErr}
						event={handlePrice}
					/>
					<Categorias
						categorias={stockArr}
						text={"Estado de Stock"}
						toSelect={"stock"}
						stock={true}
						err={stockErr}
						value={stock}
						event={(e) => {
							setStock(e.target.value);
						}}
					/>
					<Button value={"Crear producto"} type={"crear"} />
				</form>
			</section>
		</>
	);
}

export default CrearProducto;
