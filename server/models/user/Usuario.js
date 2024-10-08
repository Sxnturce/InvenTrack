import bcrypt from "bcryptjs"
import userSchemma from "../database/schemas/Usuario.js"

class Usuario {
  static async getTop5UsersBySales() {
    const topUsers = await userSchemma.findAll({
      order: [['ventas_totales', 'DESC']],
      limit: 5
    });
    return topUsers;
  }

  static async existEmail(email) {
    const correo = email
    const userFind = await userSchemma.findOne({
      where: { correo }
    })
    return userFind
  }

  static async comprobateID(id) {
    const userFind = await userSchemma.findOne({
      where: { id }
    })
    return userFind
  }

  static async comprobatePass(pass, user) {
    const comprobation = await bcrypt.compare(pass, user.contrasena)
    return comprobation
  }

  static async comprobateToken(token) {
    const tokenFind = await userSchemma.findOne({
      where: { token }
    })
    return tokenFind
  }

  static async createUser(obj) {
    const { nombre, correo, pass } = obj
    const crypted = await bcrypt.hash(pass, 10)

    const user = await userSchemma.create({
      nombre_usuario: nombre,
      correo: correo,
      contrasena: crypted
    })
    return user
  }

  static async hashPassword(newPass) {
    const passwordHashed = await bcrypt.hash(newPass, 10)
    return passwordHashed
  }

  static async existTokenPass(token_pass) {
    const userFind = await userSchemma.findOne({
      where: { token_pass }
    })
    return userFind
  }
}


export default Usuario