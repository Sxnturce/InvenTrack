import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "@sweetalert2/theme-bulma";
import Query from "../Querys.js";

const mySwal = withReactContent(Swal);

async function getUser(id) {
  let user
  try {
    user = await Query.getData(`product/${id}`)
  } catch (e) {
    console.log(e);
  }
  return user
}

async function AlertReport(id) {
  const data = await getUser(id)
  const { nombre, id: producto_id } = data.data

  const { value: formValues, isConfirmed } = await mySwal.fire({
    title: "Reporte de Producto",
    html: `
      <div style="text-align: left;">

      <div style="margin-bottom: 1rem;">
      <label for="swal-product" style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Producto:</label>
      <select id="swal-product" class="swal2-input" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; background-color: #cfcfcf; color:black; font-weight:500;" disabled>
        <option value="${producto_id}">${nombre}</option>
      </select>
    </div>
        <div style="margin-bottom: 1rem;">
          <label for="swal-quantity" style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Cantidad Solicitada:</label>
          <input id="swal-quantity" type="number" placeholder="Ingrese la cantidad solicitada" class="swal2-input" style="width: 100%; margin:0; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;">
        </div>
        
        <div style="margin-bottom: 1rem;">
          <label for="swal-status" style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Estado de Envío:</label>
          <select id="swal-status" class="swal2-input" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;">
            <option value="" disabled selected>Seleccione el estado de envío</option>
            <option value="pendiente">Pendiente</option>
            <option value="enviado">Enviado</option>
            <option value="entregado">Entregado</option>
          </select>
        </div>

      </div>
    `,
    focusConfirm: false,
    preConfirm: () => {
      const cantidad = document.getElementById("swal-quantity").value;
      const estadoEnvio = document.getElementById("swal-status").value;
      const producto = document.getElementById("swal-product").value;

      if (!cantidad || cantidad <= 0) {
        Swal.showValidationMessage("Por favor, ingrese una cantidad válida.");
        return false;
      }

      if (!estadoEnvio) {
        Swal.showValidationMessage("Por favor, seleccione un estado de envío.");
        return false;
      }

      if (!producto.trim()) {
        Swal.showValidationMessage("Por favor, seleccione un producto.");
        return false;
      }

      return { cantidad, estadoEnvio, producto };
    },
    confirmButtonText: "Enviar",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
  });

  if (isConfirmed) {
    return {
      cantidad: formValues.cantidad,
      estado_envio: formValues.estadoEnvio,
      producto_id
    }
  }
}

export default AlertReport;
