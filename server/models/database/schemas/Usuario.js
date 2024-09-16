import { DataTypes } from "sequelize";
import generateToken from "../../../helpers/Token.js";
import db from "../database.js";

const userSchemma = db.define('usuarios', {
  nombre_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_registro: {
    type: DataTypes.TIME,
  },
  token: {
    type: DataTypes.STRING(),
    defaultValue: generateToken()
  },
  confirmado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})

export default userSchemma