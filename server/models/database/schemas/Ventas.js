import { DataTypes } from "sequelize";
import db from "../database.js";

const ventasSchemma = db.define('ventas', {
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_venta: {
    type: DataTypes.TIME,
  },
  total_venta: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
})

export default ventasSchemma