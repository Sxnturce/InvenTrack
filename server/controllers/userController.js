import Usuario from "../models/user/Usuario.js"
import generateJWT from "../config/jwt.js"
import sendEmail from "../helpers/emailConfirmation.js"
import generatePassToken from "../helpers/tokenPass.js"
import sendPasswordResetEmail from "../helpers/emailPassword.js"
import { userValidate, userValidatePartial, emailPassValidate, tokenPassValidate, passValidatePartial } from "../schemes/userValidate.js"

export class User {
  static loginUser = async (req, res) => {
    const result = userValidatePartial(req.body)
    if (!result.success) {
      return res.status(400).json(result.error)
    }

    const user = await Usuario.existEmail(result.data.correo)
    if (!user) {
      return res.status(404).json({ msg: "El correo ingresado no existe." })
    }

    if (!user.confirmado) {
      return res.status(401).json({ msg: "El usuario no confirmo su cuenta." })
    }
    const comprobate = await Usuario.comprobatePass(result.data.pass, user)
    if (!comprobate) {
      return res.status(400).json({ msg: "Contraseña incorrecta." })
    }

    const token = generateJWT(user.id)
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60
    }).json({ msg: "Token successfull", user: { id: user.id, nombre_usuario: user.nombre_usuario, ventas_totales: user.ventas_totales, cantidad_vendida: user.cantidad_vendida } })
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

  static forgotPass = async (req, res) => {
    const result = emailPassValidate(req.body)

    if (!result.success) {
      return res.status(400).json({ err: result.error })
    }

    const user = await Usuario.existEmail(result.data.correo)
    if (!user) {
      return res.status(404).json({ msg: "El correo ingresado no esta registrado." })
    }
    if (!user.confirmado) {
      return res.status(401).json({ msg: "El correo ingresado no esta confirmado." })
    }

    try {
      user.token_pass = generatePassToken();
      await user.save();
      sendPasswordResetEmail(user);
      res.json({ msg: "Correo enviado, revise su correo electronico" })
    } catch (e) {
      return res.status(401).json({ msg: "El correo ingresado no esta registrado." })
    }
  }

  static comprobatePassToken = async (req, res) => {
    const result = tokenPassValidate(req.body)

    if (!result.success) {
      return res.status(400).json({ err: result.error })
    }
    const user = await Usuario.existTokenPass(result.data.token_pass)
    if (!user) {
      return res.status(400).json({ err: "El token ingresado no es valido." })
    }
    res.status(200).json(user)
  }

  static changePassword = async (req, res) => {
    const { token_pass } = req.params

    //Comprobar validez del token
    if (!token_pass) {
      return res.status(404).json({ msg: "Token inexistente" })
    }

    const user = await Usuario.existTokenPass(token_pass)
    if (!user) {
      return res.status(400).json({ msg: "Token no valido." })
    }

    //Comprobar validez de la contraseña
    const result = passValidatePartial(req.body)
    if (!result.success) {
      return res.status(400).json({ err: result.error })
    }

    try {
      const passHashed = await Usuario.hashPassword(result.data.pass)
      user.contrasena = passHashed
      user.token_pass = null
      user.save();
      return res.status(201).json({ msg: "Contraseña actualizada correactamente." })
    } catch (e) {
      res.status(400).json({ msg: "Error al intentar actualizar la contraseña." })
    }
  }
}