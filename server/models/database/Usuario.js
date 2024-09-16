import { DataTypes } from "sequelize";
import db from "./database.js";

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
  }
})

export default userSchemma