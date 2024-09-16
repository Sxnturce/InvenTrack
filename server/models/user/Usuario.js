import userSchemma from "../database/Usuario.js"

class Usuario {
  static async existEmail(email) {
    const correo = email
    const userFind = await userSchemma.findOne({
      where: { correo }
    })
    return userFind
  }
  static async createUser(obj) {
    const { nombre, correo, pass } = obj
    const user = await userSchemma.create({
      nombre_usuario: nombre,
      correo: correo,
      contrasena: pass
    })
    return user
  }
}


export default Usuario