// Factura.model.mjs

export default (sequelize, DataTypes) => {
   const Factura = sequelize.define('Factura', {
     id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
     },
     fechaEmision: {
       type: DataTypes.DATE,
       allowNull: false
     },
     clienteId: {
       type: DataTypes.INTEGER,
       allowNull: true // Permite nulos para consumidor final
     },
     estadoFacturaId: {
       type: DataTypes.INTEGER,
       allowNull: false
     },
     total: {
       type: DataTypes.DECIMAL(10, 2),
       allowNull: false
     }
   }, {
     tableName: 'Facturas'
   });
 
   Factura.associate = function(models) {
     Factura.belongsTo(models.Cliente, {
       foreignKey: 'clienteId',
       as: 'cliente'
     });
     Factura.belongsTo(models.EstadoFactura, {
       foreignKey: 'estadoFacturaId',
       as: 'estado'
     });
     Factura.hasMany(models.Pago, {
       foreignKey: 'facturaId',
       as: 'pagos'
     });
     // Asumiendo que ya existe una definición para DetalleFactura
     Factura.hasMany(models.DetalleFactura, {
       foreignKey: 'facturaId',
       as: 'detalles'
     });
   };
 
   return Factura;
 };
 