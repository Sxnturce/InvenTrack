import { productValidate } from "../schemes/productValidate.js";
import { pedidoValidate, partialPedidoValidate } from "../schemes/PedidoValidate.js";
import { ventaValidate } from "../schemes/VentaValidate.js";
import db from "../models/database/database.js";
import Producto from "../models/user/Producto.js"
import Pedido from "../models/user/Pedido.js";
import Tipo from "../models/user/Tipo.js";
import Usuario from "../models/user/Usuario.js";
import TipoStats from "../models/user/TipoStats.js";
import ProductStats from "../models/user/ProductStats.js"
import sendEmailReport from "../helpers/emailReport.js";
import Ventas from "../models/user/Ventas.js";
import methodDecimal from "../helpers/MethodDecimal.js";

class Admin {
  static dashboard = async (req, res) => {
    const user = req.usuario.dataValues
    try {
      return res.json({ usuario: user })
    } catch (e) {
      res.status(401).json({ err: e })
    }
  }

  static findUser = async (req, res) => {
    const { id } = req.params
    try {
      const user = await Usuario.comprobateID(id)
      return res.json({ user })
    } catch (e) {
      res.status(401).json({ err: e })
    }
  }

  //Tops
  static getTopUsers = async (req, res) => {
    try {
      const topUserSales = await Usuario.getTop5UsersBySales();
      return res.json({ topUserSales: topUserSales })
    } catch (e) {
      res.status(401).json({ err: e })
    }
  }

  static getTopProduct = async (req, res) => {
    try {
      const topSellProduct = await ProductStats.getTopSellingProduct();
      return res.json({ topSellProduct: topSellProduct })
    } catch (e) {
      res.status(401).json({ err: e })
    }
  }

  static getTopTipe = async (req, res) => {
    try {
      const topSellType = await TipoStats.getTopSellingType();
      return res.json({ topSellType: topSellType })
    } catch (e) {
      res.status(401).json({ err: e })
    }
  }

  static allTipes = async (req, res) => {
    try {
      const tipos = await Tipo.getAll()
      res.json(tipos)
    } catch (e) {
      res.status(401).json({ msg: "Error al obtener los tipos." })
    }
  }

  static getTipo = async (req, res) => {
    const { id } = req.params

    try {
      const tipo = await Tipo.getByID(id)
      if (!tipo) {
        return res.status(400).json({ err: "Producto inexistente." })
      }
      res.json(tipo)
    } catch (e) {
      res.status(404).json({ err: "Error al intentar buscar un tipo" })
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
  static allProducts = async (req, res) => {
    try {
      const producto = await Producto.getAll()
      res.json(producto)
    } catch (e) {
      res.status(401).json({ msg: "Error al obtener los productos." })
    }
  }

  static createProduct = async (req, res) => {
    console.log(req.body);
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
  static getVentas = async (_, res) => {
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
    const { precio, tipo_id } = producto
    const num = precio * cantidad
    const total_venta = methodDecimal(num)

    //Convertimos el user ventas a float para efectual la suma
    user.ventas_totales = parseFloat(user.ventas_totales) || 0;
    user.ventas_totales += total_venta;
    user.cantidad_vendida += cantidad
    producto.cantidad -= cantidad

    const t = await db.transaction();

    //Actualizamos las tablas de stats
    try {
      const tipoStats = await TipoStats.existId(tipo_id);
      const productoStats = await ProductStats.existId(producto_id);

      if (!tipoStats) {
        await TipoStats.createTipoStat(
          { tipo_id: tipo_id, total_vendido: cantidad, total_dinero: total_venta },
          { transaction: t }
        );
      } else {
        tipoStats.total_dinero = parseFloat(tipoStats.total_dinero) || 0;
        tipoStats.total_dinero += total_venta;
        tipoStats.total_vendido += cantidad;
        await tipoStats.save({ transaction: t });
      }

      if (!productoStats) {
        await ProductStats.createProductStat(
          { producto_id: producto_id, total_vendido: cantidad, total_dinero: total_venta },
          { transaction: t }
        );
      } else {
        productoStats.total_dinero = parseFloat(productoStats.total_dinero) || 0;
        productoStats.total_dinero += total_venta;
        productoStats.total_vendido += cantidad;
        await productoStats.save({ transaction: t });
      }

      //Creamos un objeto para almacenarlo
      const toCreate = { ...result.data, total_venta }
      const venta = await Ventas.createVenta(toCreate, { transaction: t })

      await user.save({ transaction: t })
      await producto.save({ transaction: t });
      await t.commit();

      return res.json({ msg: "Venta realizada correctamente", venta: venta })
    } catch (e) {
      await t.rollback();
      return res.status(400).json({ msg: "Error al realizar la venta" })
    }
  }

  static clearCookie = async (req, res) => {
    res.clearCookie("access_token").json({ msg: "Logout Successfull" })
  }
}

export default Admin