import { DataTypes } from "sequelize";
import db from "../database.js";

const productosSchemma = db.define('productos', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo_id: {
    type: DataTypes.INTEGER,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado_stock: {
    type: DataTypes.ENUM('Bajo', 'Adecuado', 'Suficiente'),
    defaultValue: "Adecuado"
  }
})

export default productosSchemma