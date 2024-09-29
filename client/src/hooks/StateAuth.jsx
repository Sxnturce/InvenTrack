import { AuthContext } from "../context/authContext";
import { useState, useEffect } from "react";
import clientAxios from "../config/Axios";

function StateAuth({ children }) {
	const [auth, setAuth] = useState(false);
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function isAuth() {
			setLoading(true);
			try {
				const result = await clientAxios.get("admin/dashboard", {
					withCredentials: true,
				});
				if (result && result.data && result.data.usuario) {
					setAuth(true);
					setUser(result.data.usuario);
				} else {
					setAuth(false);
					setUser({});
				}
			} catch (error) {
				setAuth(false);
				setUser({});
			} finally {
				setLoading(false);
			}
		}

		isAuth();
	}, []);

	return (
		<AuthContext.Provider value={{ auth, setAuth, user, setUser, loading }}>
			{children}
		</AuthContext.Provider>
	);
}

export default StateAuth;
