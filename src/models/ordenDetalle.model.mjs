export default (sequelize, DataTypes) => {
   const DetalleOrden = sequelize.define('DetalleOrden', {
     id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
     },
     OrdenId: {
       type: DataTypes.INTEGER,
       allowNull: false,
       references: {
         model: 'Ordenes', // Asume que la tabla de Ordens se define como 'Ordens'
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
     tableName: 'DetallesOrden'
   });
 
   DetalleOrden.associate = function(models) {
     DetalleOrden.belongsTo(models.Orden, {
       foreignKey: 'OrdenId',
       as: 'Orden'
     });
     DetalleOrden.belongsTo(models.Producto, {
       foreignKey: 'productoId',
       as: 'producto'
     });
   };
 
   return DetalleOrden;
 };
 