import productStatSchemma from "../database/schemas/ProductStats.js";
import { productosSchemma } from "../index.js"

class ProductStats {
  static async getTopSellingProduct() {
    const topProduct = await productStatSchemma.findOne({
      order: [['total_vendido', 'DESC']],
      limit: 1,
      include: [{
        model: productosSchemma,
        as: "product_stat",
        attributes: ["nombre"]
      }]
    });
    return topProduct;
  }

  static async createProductStat(obj) {
    const created = await productStatSchemma.create(obj);
    return created
  }

  static async existId(producto_id) {
    const productStatFind = await productStatSchemma.findOne({
      where: { producto_id }
    })
    return productStatFind
  }
}


export default ProductStats