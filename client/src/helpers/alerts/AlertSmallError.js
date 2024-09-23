import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "@sweetalert2/theme-bulma";

const mySwal = withReactContent(Swal);

async function AlertSmall(title, msg) {
  const Toast = mySwal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
  });
  Toast.fire({
    icon: "error",
    title: title,
    text: msg
  });
}

export default AlertSmall;
