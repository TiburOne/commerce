// Orden.model.mjs

export default (sequelize, DataTypes) => {
   const Orden = sequelize.define('Orden', {
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
     estadoOrdenId: {
       type: DataTypes.INTEGER,
       allowNull: false
     },
     total: {
       type: DataTypes.DECIMAL(10, 2),
       allowNull: false
     }
   }, {
     tableName: 'Ordenes'
   });
 
   Orden.associate = function(models) {
     Orden.belongsTo(models.Cliente, {
       foreignKey: 'clienteId',
       as: 'cliente'
     });
     Orden.belongsTo(models.EstadoOrden, {
       foreignKey: 'estadoOrdenId',
       as: 'estado'
     });
     // Asumiendo que ya existe una definición para DetalleOrden
     Orden.hasMany(models.DetalleOrden, {
       foreignKey: 'OrdenId',
       as: 'detalles'
     });
   };
 
   return Orden;
 };