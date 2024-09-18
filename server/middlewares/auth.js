import Usuario from "../models/user/Usuario.js";
import jwt from "jsonwebtoken";

export async function auth(req, res, next) {
  const token = req.cookies.access_token
  if (!token) {
    return res.status(404).json({ err: "Token de sesión inexsitente." })
  }

  const jwtValidate = jwt.decode(token)
  try {
    const user = await Usuario.comprobateID(jwtValidate.id)
    if (!user) {
      return res.status(404).json({ err: "El token de sesión no existe." })
    }
    req.usuario = user
    return next();
  } catch (e) {
    return res.status(404).json({ err: "No se pudo comprobar su sesión." })
  }

}