import Usuario from "../models/user/Usuario.js"
import { userValidate } from "../schemes/userValidate.js"

export class User {
  static userRegister = async (req, res) => {
    const result = userValidate(req.body)

    if (!result.success) {
      return res.status(400).json(result.error)
    }

    const exist = await Usuario.existEmail(result.data.correo)

    if (!exist) {
      try {
        await Usuario.createUser(result.data)
        return res.status(201).json({ msg: "Creado correctamente" })
      } catch (e) {
        return res.status(400).json({ msg: "Error al intentar registrarse" })
      }
    }
    res.status(409).json({ msg: "El correo ya esta registrado" })
  }
}