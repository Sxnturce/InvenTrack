import Input from "../components/dashboard/Input";
import Selected from "../components/dashboard/Selected";
import SelectedDisabled from "../components/dashboard/SelectDisabled";
import Button from "../components/auth/partials/Button";
import { useParams, useNavigate } from "react-router-dom";
import Icon from "../components/dashboard/partials/Icon";
import AlertQuestion from "../helpers/alerts/AlertQuestion.js";
import {
	faCartShopping,
	faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { ventaValidate } from "../../../server/schemes/VentaValidate.js";
import { useState, useEffect, useContext, useRef } from "react";
import Query from "../helpers/Querys";
import { AuthContext } from "../context/authContext";

function VenderProducto() {
	const [producto, setProducto] = useState("");
	const [tipo, setTipo] = useState("");
	const [nombre, setNombre] = useState("");
	const [target, setTarget] = useState("");
	const [loader, setLoader] = useState(true);
	const [cantidad, setCantidad] = useState("");
	const [tienda, setTienda] = useState("");

	const formRef = useRef(null);
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const [productoErr, setProductoErr] = useState("");
	const [tipoErr, setTipoErr] = useState("");
	const [cantidadErr, setCantidadErr] = useState("");
	const [tiendaErr, setTiendaErr] = useState("");
	const tiendas = [
		"Impresiones SAC",
		"Empresa Mecatronica",
		"Google enterprise",
	];

	const { id } = useParams();

	useEffect(() => {
		async function getProduct() {
			try {
				const product = await Query.getData(`product/${id}`);
				setTarget(product.data);
				setNombre(product.data.nombre);
				setTipo(product.data.tipos.nombre);
				setProducto(product.data.id);
				setLoader(false);
			} catch (e) {
				if (e.status === 400 || e.status === 404) {
					navigate("/admin/actions");
				}
			}
		}
		getProduct();
	}, []);

	useEffect(() => {
		setProductoErr("");
		setTipoErr("");
		setCantidadErr("");
		setTiendaErr("");
	}, [producto, tipo, cantidad, tienda]);

	async function handleSubmit(e) {
		e.preventDefault();
		const result = ventaValidate({
			usuario_id: user.id,
			producto_id: producto,
			cantidad: Number(cantidad),
		});
		if (!result.success) {
			const { issues } = result.error;
			if (issues[0].path[0] === "usuario_id") {
				setProductoErr(issues[0].message);
				console.log(issues);
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

		try {
			await Query.createVenta("create-venta", result.data);
			formRef.current.reset();
			navigate("/admin/actions", { state: { venta: true } });
		} catch (e) {
			const { err } = e.response.data;
			setProductoErr(err);
		}
	}

	function handleCount({ target: { value } }) {
		const sanitized = value.replace(/\D/g, "");
		setCantidad(sanitized);
	}

	return (
		<>
			{!loader && (
				<main>
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
										target.precio,
										target.cantidad,
										target.estado_stock
									);
								}}
							/>
						</div>
						<form
							method="post"
							className="flex flex-col gap-4"
							onSubmit={handleSubmit}
							ref={formRef}
						>
							<SelectedDisabled
								err={productoErr}
								value={nombre}
								text={"Producto"}
								id={producto}
							/>

							<SelectedDisabled
								id={2}
								text={"Categorias"}
								err={tipoErr}
								value={tipo}
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
				</main>
			)}
		</>
	);
}

export default VenderProducto;
