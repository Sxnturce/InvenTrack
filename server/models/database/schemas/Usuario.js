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
  token_pass: {
    type: DataTypes.INTEGER(),
    defaultValue: null,
    validate: {
      isInt: true,
      min: 100000,
      max: 999999
    }
  },
  confirmado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  ventas_totales: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  cantidad_vendida: {
    type: DataTypes.INTEGER(),
    defaultValue: 0
  }
}, {
  tableName: "usuarios",
  modelName: "usuarios"
})

export default userSchemma