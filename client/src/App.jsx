import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "./components/layout/authLayout";
import AdminLayout from "./components/layout/adminLayout";

// Vistas públicas
import Login from "./views/Login";
import Register from "./views/Register";
import OlvidePass from "./views/OlvidePass";
import ComprobateCode from "./views/ComprobateCode";
import ChangePass from "./views/ChangePass";
import ValidateToken from "./views/ValidateToken";

// Views dashboard (administrativas)
import Dashboard from "./views/Dashboard";
import Acciones from "./views/Acciones";
import Solicitud from "./views/Solicitudes";
import Ventas from "./views/Ventas";
import CrearProducto from "./views/CrearProducto";
import VenderProducto from "./views/VenderProducto";
import EditarProducto from "./views/EditarProducto";
import StateAuth from "./hooks/StateAuth";
import ProtectedRoute from "./views/ProtectedRoute";
function App() {
	return (
		<StateAuth>
			<BrowserRouter>
				<Routes>
					{/* Rutas públicas */}
					<Route element={<AuthLayout />} path="/">
						<Route index element={<Login />} />
						<Route path="register" element={<Register />} />
						<Route path="olvide-password" element={<OlvidePass />} />
						<Route path="comprobation" element={<ComprobateCode />} />
						<Route path="change-pass/:code" element={<ChangePass />} />
						<Route path="confirmation/:token" element={<ValidateToken />} />
					</Route>

					{/* Rutas privadas (con `ProtectedRoute` para protegerlas) */}
					<Route
						element={
							<ProtectedRoute>
								<AdminLayout />
							</ProtectedRoute>
						}
						path="/admin"
					>
						<Route index element={<Dashboard />} />
						<Route path="actions" element={<Acciones />} />
						<Route path="order-request" element={<Solicitud />} />
						<Route path="lista-ventas" element={<Ventas />} />
						<Route path="product" element={<CrearProducto />} />
						<Route path="product/:id" element={<EditarProducto />} />
						<Route path="vender-product/:id" element={<VenderProducto />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</StateAuth>
	);
}

export default App;
