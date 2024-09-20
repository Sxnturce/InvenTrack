import pedidoSchemma from "../database/schemas/Pedido.js";

class Pedido {
  static async getAll() {
    const Pedidos = await pedidoSchemma.findAll()
    return Pedidos
  }
  static async create(obj) {
    const pedido = await pedidoSchemma.create(obj)
    return pedido
  }
  static async update(pedido, id) {
    const updated = await pedidoSchemma.update({ estado_envio: pedido }, { where: { id } })
    return updated
  }

  static async comprobateID(id) {
    const comprobation = await pedidoSchemma.findOne({ where: { id } })
    return comprobation
  }
}

export default Pedido;
