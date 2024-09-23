import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "./components/layout/authLayout";
import Login from "./views/Login";
import Register from "./views/Register";
import OlvidePass from "./views/OlvidePass";
import ComprobateCode from "./views/ComprobateCode";
import ChangePass from "./views/ChangePass";
import ValidateToken from "./views/ValidateToken";

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
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
