// Pago.model.mjs

export default (sequelize, DataTypes) => {
   const Pago = sequelize.define('Pago', {
     id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
     },
     facturaId: {
       type: DataTypes.INTEGER,
       allowNull: false
     },
     tipoPagoId: {
       type: DataTypes.INTEGER,
       allowNull: false
     },
     fecha: {
       type: DataTypes.DATE,
       allowNull: false
     },
     monto: {
       type: DataTypes.DECIMAL(10, 2),
       allowNull: false
     }
   }, {
     tableName: 'Pagos'
   });
 
   Pago.associate = function(models) {
     Pago.belongsTo(models.Factura, {
       foreignKey: 'facturaId',
       as: 'factura'
     });
     Pago.belongsTo(models.TipoPago, {
       foreignKey: 'tipoPagoId',
       as: 'tipoPago'
     });
   };
 
   return Pago;
 };
 