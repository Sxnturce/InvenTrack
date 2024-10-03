import { faRankingStar } from "@fortawesome/free-solid-svg-icons";
import Icon from "./partials/Icon";
import Query from "../../helpers/Querys.js";
import { useEffect, useState } from "react";
import Sellers from "./partials/Sellers";
import person02 from "/img/person_02.webp";
import person03 from "/img/person_03.webp";
import person04 from "/img/person_04.webp";
import person05 from "/img/person_05.webp";

function Top() {
	const [users, setUsers] = useState([]);
	const [load, setLoading] = useState(true);

	useEffect(() => {
		async function getTop() {
			try {
				const info = await Query.getData("get-top-users");
				setUsers(info.data.topUserSales);
				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		}
		getTop();
	}, []);
	return (
		<>
			<div className="flex flex-col gap-4 bg-white rounded shadow">
				<section className="text-center font-black text-color-main/80 flex items-center justify-between px-6 py-2">
					<h2 className="text-2xl">Top Sellers</h2>
					<span>
						<Icon ico={faRankingStar} type={"Seller"} />
					</span>
				</section>
				{load ? (
					<span className="loader loader-gray"></span>
				) : (
					<section className="flex flex-col gap-3">
						{users.map((user, i) => {
							return (
								<Sellers
									key={user.id}
									name={user.nombre_usuario}
									img={i === 1 ? person02 : person03}
									position={(i + 1).toString()}
									cantidad={user.cantidad_vendida}
									dinero={user.ventas_totales}
								/>
							);
						})}
					</section>
				)}
			</div>
		</>
	);
}

export default Top;
