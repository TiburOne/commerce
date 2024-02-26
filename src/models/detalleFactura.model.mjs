export default (sequelize, DataTypes) => {
   const DetalleFactura = sequelize.define('DetalleFactura', {
     id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
     },
     facturaId: {
       type: DataTypes.INTEGER,
       allowNull: false,
       references: {
         model: 'Facturas', // Asume que la tabla de Facturas se define como 'Facturas'
         key: 'id'
       }
     },
     productoId: {
       type: DataTypes.INTEGER,
       allowNull: false,
       references: {
         model: 'Productos', // Asume que la tabla de Productos se define como 'Productos'
         key: 'id'
       }
     },
     cantidad: {
       type: DataTypes.INTEGER,
       allowNull: false
     },
     precio: {
       type: DataTypes.DECIMAL(10, 2),
       allowNull: false
     }
   }, {
     tableName: 'DetallesFactura'
   });
 
   DetalleFactura.associate = function(models) {
     DetalleFactura.belongsTo(models.Factura, {
       foreignKey: 'facturaId',
       as: 'factura'
     });
     DetalleFactura.belongsTo(models.Producto, {
       foreignKey: 'productoId',
       as: 'producto'
     });
   };
 
   return DetalleFactura;
 };
 