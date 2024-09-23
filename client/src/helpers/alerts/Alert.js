import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "@sweetalert2/theme-bulma";

const mySwal = withReactContent(Swal);

async function Alert(title, msg, type, update) {
	const isConfirm = await mySwal.fire({
		icon: type ? "success" : "error",
		title: title,
		text: msg,
		showConfirmButton: true,
		showCancelButton: update ? false : true,
		confirmButtonText: update ? "Aceptar" : "Regresar al inico",
	});

	if (!update) {
		if (isConfirm.isConfirmed) {
			return window.location.href = ("/");
		}
	}
}

export default Alert;
