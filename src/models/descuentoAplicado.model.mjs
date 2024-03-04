// DescuentoAplicado.model.mjs

export default (sequelize, DataTypes) => {
   const DescuentoAplicado = sequelize.define('DescuentoAplicado', {
     id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
     },
     facturaId: {
       type: DataTypes.INTEGER,
       allowNull: false,
     },
     descuentoId: {
       type: DataTypes.INTEGER,
       allowNull: false,
     },
     montoDescuento: {
       type: DataTypes.DECIMAL(10, 2),
       allowNull: false
     }
   }, {
     tableName: 'DescuentosAplicados'
   });
 
   DescuentoAplicado.associate = function(models) {
     DescuentoAplicado.belongsTo(models.Factura, {
       foreignKey: 'facturaId',
       as: 'factura'
     });
     DescuentoAplicado.belongsTo(models.Descuento, {
       foreignKey: 'descuentoId',
       as: 'descuento'
     });
   };
 
   return DescuentoAplicado;
 };
 