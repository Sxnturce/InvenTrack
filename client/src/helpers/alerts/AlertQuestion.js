import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "@sweetalert2/theme-bulma";

const mySwal = withReactContent(Swal);

async function AlertQuestion(title, msg, precio, cantidad, stock) {
  let stockStyle;
  switch (stock.toLowerCase()) {
    case "bajo":
      stockStyle = "background-color: #e15656; color: #fff;";
      break;
    case "adecuado":
      stockStyle = "background-color: #4CAF50; color: #fff;";
      break;
    case "suficiente":
      stockStyle = "background-color: #2196F3; color: #fff;";
      break;
    default:
      stockStyle = "background-color: #E0E0E0; color: #fff;";
  }

  mySwal.fire({
    icon: "info",
    title: title,
    html: `
      <div class="question">
        <p><strong>${msg}</strong></p>
        <hr />
        <div class="stats_question">
          <p><strong>Precio:</strong> S/ ${precio}</p>
          <p><strong>Cantidad:</strong> ${cantidad}</p>
          <p><strong>Stock:</strong> 
            <span style="display: inline-block; padding: 4px 8px; border-radius: 4px; ${stockStyle}">
              ${stock.charAt(0).toUpperCase() + stock.slice(1)}
            </span>
          </p>
        </div>
      </div>
    `,
    showConfirmButton: true,
    showCancelButton: false,
    confirmButtonText: "Aceptar",
  });
}

export default AlertQuestion;