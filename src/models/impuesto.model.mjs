// Impuesto.model.mjs

export default (sequelize, DataTypes) => {
   const Impuesto = sequelize.define('Impuesto', {
     id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
     },
     nombre: {
       type: DataTypes.STRING,
       allowNull: false
     },
     porcentaje_sugerido: {
       type: DataTypes.DECIMAL(5, 2),
       allowNull: false
     }
   }, {
     tableName: 'Impuestos'
   });
 
   Impuesto.associate = function(models) {
     Impuesto.belongsToMany(models.Producto, {
       through: 'ProductoImpuesto',
       as: 'productos',
       foreignKey: 'impuestoId',
       otherKey: 'productoId'
     });
   };
 
   return Impuesto;
 };
 