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
					className={`w-full p-4 sm:p-6  ${
						!change ? "ml-0 lg:ml-[250px]" : "ml-0"
					} transition-all ease-in-out`}
				>
					<Outlet />
				</main>
			</section>
		</>
	);
}

export default AdminLayout;
