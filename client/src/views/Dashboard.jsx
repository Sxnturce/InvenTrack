import LineChart from "../graphics/LineChart";
import Top from "../components/dashboard/Top";
import Alert from "../helpers/alerts/Alert.js";
import Icon from "../components/dashboard/partials/Icon";
import Stats from "../components/dashboard/Stats";
import TableIndex from "../components/dashboard/TableIndex";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Dashboard() {
	const { user } = useContext(AuthContext);
	const location = useLocation();

	useEffect(() => {
		if (!user) {
			location("/");
			return;
		}
		function isUpdated() {
			const { updated } = location.state || {};
			if (updated) {
				Alert(
					"Producto Actualizado",
					"Su producto fue actualizado correctamente.",
					true,
					true
				);
			}
			window.history.replaceState({}, document.title);
		}
		isUpdated();
	}, []);
	return (
		<>
			<section className="flex flex-col gap-9 max-w-[1450px] mx-auto">
				<div className="flex gap-4 items-center text-[#525252]">
					<Icon ico={faHome} />
					<h1 className="text-xl">DashBoard - InvenTrack</h1>
				</div>
				<Stats />
				<section className="w-full grid grid-cols-1 xl:grid-cols-[3fr,1.45fr] gap-6">
					<div className="w-full  h-[409px] min-h-[409px] overflow-hidden bg-white rounded p-2 py-4 shadow aspect-square">
						<LineChart />
					</div>
					<Top />
				</section>
				<TableIndex />
			</section>
		</>
	);
}

export default Dashboard;
