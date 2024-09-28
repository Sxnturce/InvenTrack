import Usuario from "../models/user/Usuario.js";
import jwt from "jsonwebtoken";

export async function auth(req, res, next) {
  const token = req.cookies.access_token
  if (!token) {
    return res.status(404).json({ err: "Token de sesión inexistente." })
  }

  try {
    const jwtValidate = jwt.verify(token, process.env.SECRET_KEY_JWT)
    const user = await Usuario.comprobateID(jwtValidate.id)
    if (!user) {
      return res.status(401).json({ err: "Usuario no encontrado." })
    }
    req.usuario = user
    return next();
  } catch (e) {
    return res.status(401).json({ err: "Token inválido." })
  }

}