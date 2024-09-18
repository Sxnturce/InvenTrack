import Producto from "../models/user/Producto.js"
import { productValidate } from "../schemes/productValidate.js";

class Admin {
  static dashboard = async (req, res) => {
    const user = req.usuario.dataValues
    const products = await Producto.getAll();
    res.json({ productos: products, usuario: user })
  }

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
}

export default Admin