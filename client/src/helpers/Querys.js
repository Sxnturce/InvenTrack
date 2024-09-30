import clientAxios from "../config/Axios";

class Querys {
  static async getData(url) {
    const data = await clientAxios.get(`admin/dashboard/${url}`, {
      withCredentials: true,
    });
    return data
  }
  static async createProduct(url, nombre, tipo_id, cantidad, precio, estado_stock) {
    const created = await clientAxios.post(`admin/dashboard/${url}`, {
      nombre,
      tipo_id,
      cantidad,
      precio,
      estado_stock
    }, {
      withCredentials: true,
    });
    return created
  }
  static async updateProduct(url, nombre, tipo_id, cantidad, precio, estado_stock) {
    const update = await clientAxios.put(`admin/dashboard/${url}`, {
      nombre,
      tipo_id,
      cantidad,
      precio,
      estado_stock
    }, {
      withCredentials: true,
    });
    return update
  }

  static async deleteProduct(url) {
    const del = await clientAxios.delete(`admin/dashboard/${url}`, {
      withCredentials: true,
    });
    return del
  }
  static async createReport(url, data) {
    const { usuario_id, producto_id, cantidad, estado_envio } = data
    const parse = Number(cantidad)
    const report = await clientAxios.post(`admin/dashboard/${url}`, {
      usuario_id,
      producto_id,
      cantidad: parse,
      estado_envio
    }, {
      withCredentials: true,
    });
    return report
  }
  static async createVenta(url, data) {
    const { usuario_id, producto_id, cantidad } = data
    const parse = Number(cantidad)
    const report = await clientAxios.post(`admin/dashboard/${url}`, {
      usuario_id,
      producto_id,
      cantidad: parse
    }, {
      withCredentials: true,
    });
    return report
  }

  static async updateReport(url, data) {
    const { estado_envio } = data
    const updateReport = await clientAxios.patch(`admin/dashboard/${url}`, {
      estado_envio
    }, {
      withCredentials: true,
    });
    return updateReport
  }
}


export default Querys;