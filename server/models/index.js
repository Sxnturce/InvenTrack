import userSchemma from './database/schemas/Usuario.js';
import pedidoSchemma from './database/schemas/Pedido.js';
import productosSchemma from './database/schemas/Productos.js';
import tipoSchemma from './database/schemas/Tipo.js';
import tipoStatSchemma from './database/schemas/TipoStats.js';
import productStatSchemma from './database/schemas/ProductStats.js';
import ventasSchemma from './database/schemas/Ventas.js';

//
pedidoSchemma.belongsTo(userSchemma, {
  foreignKey: 'usuario_id',
  as: 'usuario'
});

userSchemma.hasMany(pedidoSchemma, {
  foreignKey: 'usuario_id',
  as: 'pedidos'
});

productosSchemma.belongsTo(tipoSchemma, {
  foreignKey: "tipo_id",
  as: "tipos"
})

tipoSchemma.hasMany(productosSchemma, {
  foreignKey: "tipo_id"
})


pedidoSchemma.belongsTo(productosSchemma, {
  foreignKey: 'producto_id',
  as: 'producto'
});

productosSchemma.hasMany(pedidoSchemma, {
  foreignKey: 'producto_id',
});

tipoStatSchemma.belongsTo(tipoSchemma, {
  foreignKey: "tipo_id",
  as: "tipo_stat"
})

productStatSchemma.belongsTo(productosSchemma, {
  foreignKey: "producto_id",
  as: "product_stat"
})

ventasSchemma.belongsTo(userSchemma, {
  foreignKey: "usuario_id",
  as: "usuario"
})

ventasSchemma.belongsTo(productosSchemma, {
  foreignKey: "producto_id",
  as: "producto"
})


export {
  pedidoSchemma,
  productosSchemma,
  ventasSchemma,
  userSchemma,
  tipoSchemma
}