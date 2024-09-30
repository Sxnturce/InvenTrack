import tipoStatSchemma from "../database/schemas/TipoStats.js"
import { tipoSchemma } from "../index.js"

class TipoStats {
  static async getTopSellingType() {
    const topType = await tipoStatSchemma.findOne({
      order: [['total_vendido', 'DESC']],
      limit: 1,
      include: [{
        model: tipoSchemma,
        as: "tipo_stat",
        attributes: ["nombre"]
      }]
    });
    return topType;
  }

  static async createTipoStat(obj) {
    const created = await tipoStatSchemma.create(obj);
    return created
  }

  static async existId(tipo_id) {
    const tipoStatFind = await tipoStatSchemma.findOne({
      where: { tipo_id }
    })
    return tipoStatFind
  }
}


export default TipoStats