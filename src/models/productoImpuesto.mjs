export default (sequelize, DataTypes) => {
   const ProductoImpuesto = sequelize.define('ProductoImpuesto', {
     id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
     },
     productoId: {
       type: DataTypes.INTEGER,
       allowNull: false,
       references: {
         model: 'Producto', // Nombre de la tabla de productos
         key: 'id'
       }
     },
     impuestoId: {
       type: DataTypes.INTEGER,
       allowNull: false,
       references: {
         model: 'Impuesto', // Nombre de la tabla de impuestos
         key: 'id'
       }
     },
     valor: {
       type: DataTypes.DECIMAL(10, 2),
       allowNull: false
     }
   }, {
     tableName: 'ProductoImpuestos'
   });
 
   ProductoImpuesto.associate = function(models) {
     ProductoImpuesto.belongsTo(models.Producto, {
       foreignKey: 'productoId',
       as: 'producto'
     });
     ProductoImpuesto.belongsTo(models.Impuesto, {
       foreignKey: 'impuestoId',
       as: 'impuesto'
     });
   };
 
   return ProductoImpuesto;
 };
 