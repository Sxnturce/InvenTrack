import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "./components/layout/authLayout";
import AdminLayout from "./components/layout/adminLayout";
import Login from "./views/Login";
import Register from "./views/Register";
import OlvidePass from "./views/OlvidePass";
import ComprobateCode from "./views/ComprobateCode";
import ChangePass from "./views/ChangePass";
import ValidateToken from "./views/ValidateToken";
import Dashboard from "./views/Dashboard";
import Acciones from "./views/Acciones";
import Solicitud from "./views/Solicitudes";
import Ventas from "./views/Ventas";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<AuthLayout />} path="/">
						<Route index element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/olvide-password" element={<OlvidePass />} />
						<Route path="/comprobation" element={<ComprobateCode />} />
						<Route path="/change-pass/:code" element={<ChangePass />} />
						<Route path="/confirmation/:token" element={<ValidateToken />} />
					</Route>
					<Route element={<AdminLayout />} path="/admin">
						<Route index element={<Dashboard />} />
						<Route path="/admin/actions" element={<Acciones />} />
						<Route path="/admin/order-request" element={<Solicitud />} />
						<Route path="/admin/list-ventas" element={<Ventas />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
