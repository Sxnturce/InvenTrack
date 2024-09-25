import { DataTypes } from "sequelize";
import db from "../database.js";

const productStatSchemma = db.define('products_stats', {
  producto_id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
  total_vendido: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  total_dinero: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
    allowNull: false
  }
})

export default productStatSchemma