import { DataTypes } from "sequelize";
import db from "../database.js";

const pedidoSchemma = db.define('pedidos', {
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
    allowNull: false,
  },
  estado_envio: {
    type: DataTypes.ENUM('Pendiente', 'Enviado', 'Entregado'),
    defaultValue: "Pendiente"
  },
  fecha_pedido: {
    type: DataTypes.TIME,
  }
})

export default pedidoSchemma