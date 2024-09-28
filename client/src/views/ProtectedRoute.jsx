import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent.jsx";

const ProtectedRoute = ({ children }) => {
	const { auth, loading } = useContext(AuthContext);

	if (loading) {
		return <LoadingComponent />;
	}

	if (!auth) {
		return <Navigate to="/" />;
	}

	return children;
};

export default ProtectedRoute;
