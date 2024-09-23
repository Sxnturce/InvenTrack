import { Outlet } from "react-router-dom";

function AuthLayout() {
	return (
		<>
			<main className="w-11/12 max-w-[800px] lg:max-w-[1300px] mx-auto h-auto md:h-dvh grid place-content-stretch md:place-content-center">
				<section className="grid grid-cols-1 lg:grid-cols-[1fr,1.3fr]">
					<Outlet />
				</section>
			</main>
		</>
	);
}

export default AuthLayout;
