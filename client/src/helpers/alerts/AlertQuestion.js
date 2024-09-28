import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "@sweetalert2/theme-bulma";

const mySwal = withReactContent(Swal);

async function AlertQuestion(title, msg, precio, cantidad, stock) {
  // Definimos el color de fondo y el texto según el valor de stock
  let stockStyle;
  switch (stock.toLowerCase()) {
    case "bajo":
      stockStyle = "background-color: #FFEB3B; color: #000;"; // Amarillo con texto negro
      break;
    case "recomendado":
      stockStyle = "background-color: #4CAF50; color: #fff;"; // Verde con texto blanco
      break;
    case "suficiente":
      stockStyle = "background-color: #2196F3; color: #fff;"; // Azul con texto blanco
      break;
    default:
      stockStyle = "background-color: #E0E0E0; color: #000;"; // Color gris como predeterminado
  }

  mySwal.fire({
    icon: "question",
    title: title,
    html: `
      <div class="question">
        <p><strong>${msg}</strong></p>
        <hr />
        <div class="stats_question">
          <p><strong>Precio:</strong> S/.${precio}</p>
          <p><strong>Cantidad:</strong> ${cantidad}</p>
        </div>
        <p><strong>Stock:</strong> 
          <span style="display: inline-block; padding: 4px 8px; border-radius: 4px; font-weight: bold; ${stockStyle}">
            ${stock.charAt(0).toUpperCase() + stock.slice(1)}
          </span>
        </p>
      </div>
    `,
    showConfirmButton: true,
    showCancelButton: false,
    confirmButtonText: "Aceptar",
  });
}

export default AlertQuestion;