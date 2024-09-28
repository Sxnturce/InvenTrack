import Icon from "./partials/Icon";
import { useEffect, useState, useContext } from "react";
import getData from "../../helpers/getData.js";
import Card from "./partials/Card";
import { AuthContext } from "../../context/authContext";
import {
	faChartBar,
	faUser,
	faChartSimple,
} from "@fortawesome/free-solid-svg-icons";

function Stats() {
	const [product, setProduct] = useState({});
	const [toProduct, setTopProduct] = useState({});
	const [load, setLoading] = useState(true);
	const [tipe, setTipe] = useState({});
	const [topTipe, setTopTipe] = useState({});
	const { user } = useContext(AuthContext);

	useEffect(() => {
		async function getDataCards() {
			try {
				const dataProduct = getData("get-top-product");
				const dataTipo = getData("get-top-tipo");

				const [product, tipo] = await Promise.all([dataProduct, dataTipo]);

				const { topSellProduct } = product.data;
				const { topSellType } = tipo.data;

				setTopTipe(topSellType);
				setTopProduct(topSellProduct);

				const dataProducto = getData(`product/${topSellProduct.producto_id}`);
				const dataTipe = getData(`tipo/${topSellType.tipo_id}`);

				const [infoProducto, infoTipo] = await Promise.all([
					dataProducto,
					dataTipe,
				]);

				setProduct(infoProducto.data);
				setTipe(infoTipo.data);
				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		}
		getDataCards();
	}, []);

	const time = new Date().getFullYear();
	const month = new Date().getMonth();
	const day = new Date().getDay();

	return (
		<>
			<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
				<Card
					tipo={"Categoria"}
					title={"Categoria mas vendida"}
					time={`${time}/${month}/${day}`}
					name={tipe.nombre}
					price={topTipe.total_dinero}
				>
					<Icon ico={faChartBar} type={"Categoria"} />
				</Card>
				<Card
					tipo={"Producto"}
					title={"Producto mas vendido"}
					time={`${time}/${month}/${day}`}
					name={product.nombre}
					price={toProduct.total_dinero}
				>
					<Icon ico={faChartSimple} type={"Producto"} />
				</Card>
				<Card
					tipo={"Usuario"}
					title={"Estadisticas del usuario"}
					time={`${time}/${month}/${day}`}
					price={user.ventas_totales}
				>
					<Icon ico={faUser} type={"Usuario"} />
				</Card>
			</section>
		</>
	);
}

export default Stats;
