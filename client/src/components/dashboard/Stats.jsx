import Icon from "./partials/Icon";
import {
	faChartBar,
	faUser,
	faChartSimple,
} from "@fortawesome/free-solid-svg-icons";
import Card from "./partials/Card";

function Stats() {
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
					name={"Electronicos"}
					price={"1650"}
				>
					<Icon ico={faChartBar} type={"Categoria"} />
				</Card>
				<Card
					tipo={"Producto"}
					title={"Producto mas vendido"}
					time={`${time}/${month}/${day}`}
					name={"Lavadora"}
					price={"5050"}
				>
					<Icon ico={faChartSimple} type={"Producto"} />
				</Card>
				<Card
					tipo={"Usuario"}
					title={"Estadisticas del usuario"}
					time={`${time}/${month}/${day}`}
					price={"10,050"}
				>
					<Icon ico={faUser} type={"Usuario"} />
				</Card>
			</section>
		</>
	);
}

export default Stats;
