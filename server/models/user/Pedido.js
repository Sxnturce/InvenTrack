import pedidoSchemma from "../database/schemas/Pedido.js";
import { userSchemma, productosSchemma } from "../index.js"

class Pedido {
  static async getAll() {
    const Pedidos = await pedidoSchemma.findAll({
      include: [
        {
          model: userSchemma,
          as: 'usuario',
          attributes: ['nombre_usuario']
        },
        {
          model: productosSchemma,
          as: "producto",
          attributes: ['nombre']
        }
      ]
    });
    return Pedidos;
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
