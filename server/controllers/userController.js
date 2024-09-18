import Usuario from "../models/user/Usuario.js"
import generateJWT from "../config/jwt.js"
import sendEmail from "../helpers/emailConfirmation.js"
import { userValidate, userValidatePartial } from "../schemes/userValidate.js"

export class User {
  static loginUser = async (req, res) => {
    const result = userValidatePartial(req.body)
    if (!result.success) {
      return res.status(400).json(result.error)
    }

    const user = await Usuario.existEmail(result.data.correo)
    if (!user) {
      return res.status(404).json({ msg: "El correo no existe" })
    }

    if (!user.confirmado) {
      return res.status(400).json({ msg: "El usuario no confirmo su cuenta." })
    }
    const comprobate = await Usuario.comprobatePass(result.data.pass, user)
    if (!comprobate) {
      return res.status(400).json({ msg: "Contraseña incorrecta." })
    }

    const token = generateJWT(user.id)
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: `/api/user/dashboard`,
      maxAge: 1000 * 60 * 60
    })
  }

  static confirmEmail = async (req, res) => {
    const { token } = req.params

    if (!token) {
      return res.status(400).json({ msg: "Token inexistente." })
    }

    try {
      const user = await Usuario.comprobateToken(token)
      if (!user) {
        return res.status(404).json({ msg: "El token ingresado no existe" })
      }
      user.token = null
      user.confirmado = true
      await user.save();

      res.status(200).json({ msg: "Cuenta registrada correctamente" })
    } catch (e) {
      res.status(400).json({ msg: "Error al intentar confirmar el email." })
    }
  }

  static userRegister = async (req, res) => {
    const result = userValidate(req.body)
    if (!result.success) {
      return res.status(400).json(result.error)
    }

    const exist = await Usuario.existEmail(result.data.correo)
    if (!exist) {
      try {
        const user = await Usuario.createUser(result.data)
        sendEmail(user)
        return res.status(201).json({ msg: "Creado correctamente" })
      } catch (e) {
        return res.status(400).json({ msg: "Error al intentar registrarse" })
      }
    }
    res.status(409).json({ msg: "El correo ya esta registrado" })
  }
}