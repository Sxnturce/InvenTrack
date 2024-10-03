import Input from "../components/dashboard/Input";
import Categorias from "../components/dashboard/Categorias";
import Button from "../components/auth/partials/Button";
import methodDecimal from "../helpers/MethodDecimal";
import { useParams, useNavigate } from "react-router-dom";
import Query from "../helpers/Querys.js";
import Icon from "../components/dashboard/partials/Icon";
import { faShapes } from "@fortawesome/free-solid-svg-icons";
import { productValidate } from "../validate/productoValidate.js";
import { useState, useEffect, useRef } from "react";

function CrearProducto() {
	const [nombre, setNombre] = useState("");
	const [tipo, setTipo] = useState("");
	const [categoria, setCategoria] = useState([]);
	const [cantidad, setCantidad] = useState("");
	const [precio, setPrecio] = useState("");
	const [stock, setStock] = useState("");
	const [load, setLoading] = useState(true);
	const [spinner, setSpinner] = useState(false);

	const [nombreErr, setNombreErr] = useState("");
	const [tipoErr, setTipoErr] = useState("");
	const [cantidadErr, setCantidadErr] = useState("");
	const [precioErr, setPrecioErr] = useState("");
	const [stockErr, setStockErr] = useState("");
	const formRef = useRef(null);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function loadData() {
			try {
				const queryTipo = Query.getData("all-tipes");
				const queryProduct = Query.getData(`product/${id}`);

				const [tipos, producto] = await Promise.all([queryTipo, queryProduct]);
				setCategoria(tipos);

				//Setting data
				setNombre(producto.data.nombre);
				setTipo(producto.data.tipo_id);
				setCantidad(producto.data.cantidad);
				setPrecio(producto.data.precio);
				setStock(producto.data.estado_stock.toLowerCase());
				setLoading(false);
			} catch (e) {
				if (e.status === 400) {
					navigate("/admin");
				}
			}
		}
		loadData();
	}, []);

	const stockArr = ["Bajo", "Adecuado", "Suficiente"];

	useEffect(() => {
		setNombreErr("");
		setTipoErr("");
		setCantidadErr("");
		setPrecioErr("");
		setStockErr("");
	}, [nombre, tipo, cantidad, precio, stock]);

	async function handleSubmit(e) {
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
		const { nombre: name, estado_stock, precio: price, tipo_id } = result.data;
		setSpinner(true);
		try {
			await Query.updateProduct(
				`product/${id}`,
				name,
				tipo_id,
				result.data.cantidad,
				price,
				estado_stock
			);
			formRef.current.reset();
			resetValues();
			navigate("/admin", { state: { updated: true } });
		} catch (e) {
			console.log(e);
			const { err } = e.response?.data;
			setNombreErr(err);
			setSpinner(false);
		} finally {
			setSpinner(false);
		}
	}

	function handleCount({ target: { value } }) {
		const sanitized = value.replace(/\D/g, "");
		setCantidad(sanitized);
	}

	function handlePrice({ target: { value } }) {
		const sanitized = value.replace(/[^0-9.]/g, "");
		setPrecio(sanitized);
	}

	function resetValues() {
		setNombre("");
		setTipo("");
		setCantidad("");
		setPrecio("");
		setStock("");
	}
	return (
		<>
			{load ? (
				<div className="flex w-full h-[300px]  sm:h-[500px] items-center justify-center">
					<span className="loader block"></span>
				</div>
			) : (
				<main>
					<div className="flex gap-4 items-center text-[#525252]">
						<Icon ico={faShapes} type={"Categoria"} />
						<h1 className="text-xl">Editar Producto - InvenTrack</h1>
					</div>
					<section className="w-full flex flex-col gap-6 max-w-[550px] bg-white rounded shadow px-6 py-4 mx-auto mt-8">
						<h1 className="text-3xl text-amber-500 font-black ">
							Editar Producto
						</h1>
						<form
							method="post"
							className="flex flex-col gap-4"
							onSubmit={handleSubmit}
							ref={formRef}
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
								categorias={categoria.data}
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
							{spinner && <span className="spinner-form"></span>}
							<Button value={"Guardar cambios"} type={"editar"} />
						</form>
					</section>
				</main>
			)}
		</>
	);
}

export default CrearProducto;
