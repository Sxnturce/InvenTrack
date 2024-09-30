import productosSchemma from "../database/schemas/Productos.js";
import { tipoSchemma } from "../index.js"

class Productos {
  static async getAll() {
    const products = await productosSchemma.findAll({
      include: [
        {
          model: tipoSchemma,
          as: 'tipos',
          attributes: ['nombre']
        }
      ]
    })
    return products
  }

  static async create(product) {
    const creation = await productosSchemma.create(product)
    return creation
  }

  static async getById(id) {
    const finded = await productosSchemma.findOne({
      where: { id },
      include: [
        {
          model: tipoSchemma,
          as: 'tipos',
          attributes: ['nombre']
        }
      ]
    })
    return finded
  }

  static async updateById(product, id) {
    const update = await productosSchemma.update(product, { where: { id } })
    return update
  }

  static async deleteById(id) {
    const deleted = await productosSchemma.destroy({ where: { id } })
    return deleted
  }

  static async findbyQuery(query) {
    const queryName = await productosSchemma.findAll({ where: { nombre: query } })
    return queryName
  }

  static async findByType(typo) {
    const queryType = await productosSchemma.findAll({ where: { tipo_id: typo } })
    return queryType
  }
}

export default Productos