import tipoSchemma from "../database/schemas/Tipo.js";

class Tipo {
  static async getOne(nombre) {
    const tipos = await tipoSchemma.findOne({ where: { nombre } })
    return tipos
  }

  static async getAll() {
    const categories = await tipoSchemma.findAll()
    return categories
  }
}

export default Tipo;

