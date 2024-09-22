import ventasSchemma from "../database/schemas/Ventas.js";

class Ventas {
  static async getAll() {
    const ventas = await ventasSchemma.findAll();
    return ventas
  }

  static async createVenta(obj) {
    const created = await ventasSchemma.create(obj);
    return created
  }
}

export default Ventas;