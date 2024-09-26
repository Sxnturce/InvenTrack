import { faRankingStar } from "@fortawesome/free-solid-svg-icons";
import Icon from "./partials/Icon";
import Sellers from "./partials/Sellers";
import person02 from "/img/person_02.webp";
import person03 from "/img/person_03.webp";
import person04 from "/img/person_04.webp";
import person05 from "/img/person_05.webp";

function Top() {
	return (
		<>
			<div className="flex flex-col gap-4 bg-white rounded shadow">
				<section className="text-center font-black text-color-main/80 flex items-center justify-between px-6 py-2">
					<h2 className="text-2xl">Top Sellers</h2>
					<span>
						<Icon ico={faRankingStar} type={"Seller"} />
					</span>
				</section>
				<section className="flex flex-col gap-3">
					<Sellers
						name={"Sebastian Sicha"}
						img={person05}
						position={"1"}
						cantidad={50}
						dinero={"1800"}
					/>
					<Sellers
						name={"Genesis Areceli"}
						img={person02}
						position={"2"}
						cantidad={20}
						dinero={"800"}
					/>
					<Sellers
						name={"Susana Riveros"}
						img={person03}
						position={"3"}
						cantidad={120}
						dinero={"13800"}
					/>
					<Sellers
						name={"Isabel Ruiz"}
						img={person04}
						position={"4"}
						cantidad={500}
						dinero={"15800"}
					/>
					<Sellers
						name={"Sthepanny R"}
						img={person05}
						position={"5"}
						cantidad={1800}
						dinero={"2800"}
					/>
				</section>
			</div>
		</>
	);
}

export default Top;
