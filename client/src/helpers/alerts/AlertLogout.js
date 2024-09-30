import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "@sweetalert2/theme-bulma";

const mySwal = withReactContent(Swal);

async function AlertLogout() {
  let result = false
  const isConfirm = await mySwal.fire({
    title: "Cerrar sesión",
    text: "Si abandonas tendras que iniciar sesión nuevamente",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#b13131",
    cancelButtonColor: "#6591c7",
    confirmButtonText: "Salir"
  });

  if (isConfirm.isConfirmed) {
    result = true;
  }
  return result
}

export default AlertLogout;
