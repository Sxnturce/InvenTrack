import { DataTypes } from "sequelize";
import db from "../database.js";

const tipoSchemma = db.define('tipos', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
})

export default tipoSchemma