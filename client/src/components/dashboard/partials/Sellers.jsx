import Popup from "../Popup";
import { useState } from "react";

function Sellers({ img, name, cantidad, position, dinero }) {
	const [active, setActive] = useState(false);
	return (
		<>
			<div
				className="flex items-center justify-between cursor-pointer hover:bg-sky-50 px-6 py-1 text-gray-500 transition-all ease-in-out"
				onClick={() => {
					setActive(!active);
				}}
			>
				<div className="flex gap-1">
					<p className={`text-[1.03rem]`}>
						{position}.- {name}
					</p>
				</div>
				<img
					src={img}
					alt="seller-img"
					className=" rounded-full w-[50px] h-[50px] object-cover overflow-hidden"
				/>
				{active && (
					<Popup
						name={name}
						cantidad={cantidad}
						position={position}
						img={img}
						dinero={dinero}
					>
						<button
							type="button"
							className="px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
							onClick={() => {
								setActive(!active);
							}}
						>
							Cerrar
						</button>
					</Popup>
				)}
			</div>
		</>
	);
}

export default Sellers;
