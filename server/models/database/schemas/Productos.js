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
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  estado_stock: {
    type: DataTypes.ENUM('Bajo', 'Adecuado', 'Suficiente'),
    defaultValue: "Adecuado",
  }
}, {
  tableName: "productos",
  modelName: "productos"
})

export default productosSchemma