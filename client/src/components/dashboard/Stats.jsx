import Icon from "./partials/Icon";
import { useEffect, useState, useContext } from "react";
import Query from "../../helpers/Querys.js";
import Card from "./partials/Card";
import { AuthContext } from "../../context/authContext";
import {
	faChartBar,
	faUser,
	faChartSimple,
} from "@fortawesome/free-solid-svg-icons";

function Stats() {
	const [product, setProduct] = useState({});
	const [topProduct, setTopProduct] = useState({});
	const [tipe, setTipe] = useState({});
	const [topTipe, setTopTipe] = useState({});
	const [loading, setLoading] = useState(true);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		async function getDataCards() {
			try {
				const [productResponse, tipeResponse] = await Promise.all([
					Query.getData("get-top-product"),
					Query.getData("get-top-tipo"),
				]);

				const { topSellProduct } = productResponse.data;
				const { topSellType } = tipeResponse.data;

				setTopTipe(topSellType);
				setTopProduct(topSellProduct);

				const [infoProducto, infoTipo] = await Promise.all([
					Query.getData(`product/${topSellProduct.producto_id}`),
					Query.getData(`tipo/${topSellType.tipo_id}`),
				]);

				setProduct(infoProducto.data);
				setTipe(infoTipo.data);
			} catch (error) {
				console.error("Error al cargar los datos:", error);
			} finally {
				setLoading(false);
			}
		}
		getDataCards();
	}, []);

	const time = new Date().getFullYear();
	const month = new Date().getMonth();
	const day = new Date().getDate();

	return (
		<>
			{!loading && (
				<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					<Card
						tipo={"Categoria"}
						title={"Categoria más vendida"}
						time={`${day}/${month}/${time}`}
						name={tipe.nombre}
						price={topTipe.total_dinero}
					>
						<Icon ico={faChartBar} type={"Categoria"} />
					</Card>
					<Card
						tipo={"Producto"}
						title={"Producto más vendido"}
						time={`${day}/${month}/${time}`}
						name={product.nombre}
						price={topProduct.total_dinero}
					>
						<Icon ico={faChartSimple} type={"Producto"} />
					</Card>
					<Card
						tipo={"Usuario"}
						title={"Estadísticas del usuario"}
						time={`${day}/${month}/${time}`}
						price={user.ventas_totales}
					>
						<Icon ico={faUser} type={"Usuario"} />
					</Card>
				</section>
			)}
		</>
	);
}

export default Stats;
