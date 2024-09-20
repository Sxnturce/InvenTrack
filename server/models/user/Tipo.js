import tipoSchemma from "../database/schemas/Tipo.js";

class Tipo {
  static async getOne(nombre) {
    const tipos = await tipoSchemma.findOne({ where: { nombre } })
    return tipos
  }
}

export default Tipo;

