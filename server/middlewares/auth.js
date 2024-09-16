import Usuario from "../models/database/schemas/Usuario.js";

export function auth(req, res) {
  const token = req.cookies.acces_token
  res.json(token)
}