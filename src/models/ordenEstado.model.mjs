// EstadoOrden.model.mjs

export default (sequelize, DataTypes) => {
   const EstadoOrden = sequelize.define('EstadoOrden', {
     id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
     },
     nombre: {
       type: DataTypes.STRING,
       allowNull: false
     },
     descripcion: {
       type: DataTypes.STRING,
       allowNull: true
     }
   }, {
     tableName: 'EstadosOrden'
   });

   EstadoOrden.associate = function(models) {
     // Relación inversa para que puedas encontrar fácilmente todas las órdenes con un cierto estado
     EstadoOrden.hasMany(models.Orden, {
       foreignKey: 'estadoOrdenId',
       as: 'ordenes'
     });
   };

   return EstadoOrden;
};
