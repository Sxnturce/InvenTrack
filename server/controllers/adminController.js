import Producto from "../models/user/Producto.js"
import Pedido from "../models/user/Pedido.js";
import Tipo from "../models/user/Tipo.js";
import Usuario from "../models/user/Usuario.js";
import sendEmailReport from "../helpers/emailReport.js";
import { productValidate } from "../schemes/productValidate.js";
import { pedidoValidate, partialPedidoValidate } from "../schemes/PedidoValidate.js";
import Ventas from "../models/user/Ventas.js";
import { ventaValidate } from "../schemes/VentaValidate.js";

class Admin {
  static dashboard = async (req, res) => {
    const user = req.usuario.dataValues
    try {
      const products = await Producto.getAll();
      return res.json({ productos: products, usuario: user })
    } catch (e) {
      res.status(401).json({ err: "No esta authorizado para realizar esta acción." })
    }
  }

  static findCategory = async (req, res) => {
    const { tipo } = req.query

    if (!tipo) {
      return res.status(400).json("No se encontro nada.")
    }

    const category = await Tipo.getOne(tipo);

    if (category) {
      try {
        const result = await Producto.findByType(category.id)
        if (result.length === 0) {
          return res.status(404).json({ msg: "No se encontraron resultados." })
        }

        res.json(result)
      } catch (e) {
        res.status(400).json({ err: "Error al intentar buscar un producto." })
      }
    }
    res.status(404).json({ msg: "No se encontraron resultados." })
  }

  //Productos
  static createProduct = async (req, res) => {
    const result = productValidate(req.body)

    if (!result.success) {
      return res.status(400).json(result.error)
    }

    try {
      await Producto.create(result.data)
      return res.status(201).json({ msg: "Producto creado correctamente" })
    } catch (e) {
      res.status(400).json({ msg: "Error al intentar crear un producto." })
    }
  }

  static getProduct = async (req, res) => {
    const { id } = req.params

    try {
      const product = await Producto.getById(id)
      if (!product) {
        return res.status(400).json({ err: "Producto inexistente." })
      }
      res.json(product)
    } catch (e) {
      res.status(404).json({ err: "Error al intentar buscar un producto" })
    }

  }

  static updateProduct = async (req, res) => {
    const { id } = req.params
    const result = productValidate(req.body)

    if (!result.success) {
      return res.status(400).json(result.error)
    }

    const product = await Producto.getById(id)
    if (!product) {
      return res.status(400).json({ err: "Producto inexistente." })
    }

    try {
      await Producto.updateById(result.data, id)
      return res.status(200).json({ msg: "Producto actualizado correctamente." })
    } catch (e) {
      res.status(404).json({ err: "Error al intentar actualizar el producto." })
    }
  }

  static deleteProduct = async (req, res) => {
    const { id } = req.params

    const product = await Producto.getById(id)
    if (!product) {
      return res.status(400).json({ err: "Producto inexistente." })
    }

    try {
      await Producto.deleteById(id)
      return res.status(200).json({ msg: "Producto eliminado correctamente." })
    } catch (e) {
      res.status(404).json({ err: "Error al intentar eliminar el producto." })
    }
  }


  //Reportes
  static getReports = async (req, res) => {
    try {
      const reports = await Pedido.getAll()
      return res.json(reports)
    } catch (e) {
      res.status(401).json({ err: "Error al intentar traer los datos." })
    }
  }

  static generateReport = async (req, res) => {
    const result = pedidoValidate(req.body)

    if (!result.success) {
      return res.status(400).json({ err: result.error })
    }

    const { usuario_id: user_id, producto_id: product_id } = result.data

    const user = await Usuario.comprobateID(user_id)
    if (!user) {
      return res.status(400).json({ err: "El id del usuario no es valido." })
    }

    const producto = await Producto.getById(product_id)
    if (!producto) {
      return res.status(400).json({ err: "El id del producto no es valido." })
    }

    try {
      const pedido = await Pedido.create(result.data);
      sendEmailReport(pedido, producto, user)
      return res.status(201).json({ msg: "Reporte generado correctamente.", pedido: pedido })
    } catch (e) {
      res.status(400).json({ err: "Hubo un error al momento de hacer el pedido." })
    }
  }

  static updateReport = async (req, res) => {
    const { id } = req.params
    const result = partialPedidoValidate(req.body)

    if (!result.success) {
      return res.status(400).json({ err: result.error })
    }

    if (!Number(id)) {
      return res.status(400).json({ err: "Parametro invalido" })
    }

    const report = await Pedido.comprobateID(id)
    if (!report) {
      return res.status(404).json({ err: "La id del pedido no fue encontrada." })
    }

    try {
      await Pedido.update(result.data.estado_envio, id)
      return res.json({ msg: "Reporte actualizado correctamente." })
    } catch (error) {
      res.status(400).json({ err: "Ocurrio un error al intentar actualizar el reporte." })
    }
  }

  //Ventas
  static getVentas = async (req, res) => {
    try {
      const ventas = await Ventas.getAll()
      return res.json(ventas)
    } catch (e) {
      res.status(401).json({ e })
    }
  }

  static createVenta = async (req, res) => {
    const result = ventaValidate(req.body)
    if (!result.success) {
      return res.status(400).json({ err: result.error })
    }

    const { usuario_id, producto_id, cantidad } = result.data

    const user = await Usuario.comprobateID(usuario_id)
    if (!user) {
      return res.status(404).json({ err: "No se encontro un usuario con esta ID." })
    }

    const producto = await Producto.getById(producto_id)
    if (!producto) {
      return res.status(404).json({ err: "No se encontro un producto con esta ID." })
    }

    //Comprobamos que la cantidad no exceda la cantidad de ese producto en la DB
    if (producto.cantidad < cantidad) {
      return res.status(400).json({ err: "No hay stock suficiente para realizar esta venta." })
    }

    //Obtenemos el precio del producto
    const { precio } = producto
    const num = precio * cantidad
    const total_venta = Math.round((num + Number.EPSILON) * 100) / 100

    //Convertimos el user ventas a float para efectual la suma
    user.ventas_totales = parseFloat(user.ventas_totales) || 0;
    user.ventas_totales += total_venta;
    producto.cantidad -= cantidad

    //Creamos un objeto para almacenarlo
    const toCreate = { ...result.data, total_venta }
    try {
      const venta = await Ventas.createVenta(toCreate)
      await user.save()
      await producto.save();
      return res.json({ msg: "Venta realizada correctamente", venta: venta })
    } catch (e) {
      return res.status(400).json({ err: e })
    }
  }
}

export default Admin