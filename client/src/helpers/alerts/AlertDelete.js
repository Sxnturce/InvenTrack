import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "@sweetalert2/theme-bulma";

const mySwal = withReactContent(Swal);

async function AlertDelete() {
  let result = false
  const isConfirm = await mySwal.fire({
    title: "Estas seguro?",
    text: "Si borras este producto no se podra recuperar!",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#e97e7e",
    cancelButtonColor: "#348af3",
    confirmButtonText: "Borrar"
  });

  if (isConfirm.isConfirmed) {
    result = true;
  }
  return result
}

export default AlertDelete;
