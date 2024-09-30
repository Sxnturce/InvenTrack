import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "@sweetalert2/theme-bulma";

const mySwal = withReactContent(Swal);

function alertSmallSuccess() {
  const Toast = mySwal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    didOpen: (toast) => {
      toast.onmouseenter = mySwal.stopTimer;
      toast.onmouseleave = mySwal.resumeTimer;
    }
  });
  Toast.fire({
    icon: "success",
    title: "Actualizado correctamente"
  });
}

export default alertSmallSuccess