import ventasSchemma from "../database/schemas/Ventas.js";
import { productosSchemma, userSchemma } from "../index.js"

class Ventas {
  static async getAll() {
    const ventas = await ventasSchemma.findAll({
      include: [{
        model: userSchemma,
        as: "usuario",
        attributes: ["nombre_usuario"]
      }, {
        model: productosSchemma,
        as: "producto",
        attributes: ["nombre"]
      }
      ]
    });
    return ventas
  }

  static async createVenta(obj) {
    const created = await ventasSchemma.create(obj);
    return created
  }
}

export default Ventas;