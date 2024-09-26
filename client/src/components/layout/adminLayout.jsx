import { Outlet } from "react-router-dom";
import Switch from "../dashboard/partials/Switch";
import Header from "../dashboard/Header";
import Sidebar from "../dashboard/Sidebar";
import { useState } from "react";

function AdminLayout() {
	const [change, setChange] = useState(false);

	return (
		<>
			<Header change={change}>
				<Switch
					event={() => {
						setChange(!change);
					}}
				/>
			</Header>
			<section className="flex w-full mt-[76.4px]">
				<Sidebar state={change} />
				<main
					className={`bg-green-600 w-full ${
						!change ? "ml-[250px]" : "ml-0"
					} transition-all ease-in-out`}
				>
					<Outlet />
				</main>
			</section>
		</>
	);
}

export default AdminLayout;
