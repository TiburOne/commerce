// EstadoFactura.model.mjs

export default (sequelize, DataTypes) => {
   const EstadoFactura = sequelize.define('EstadoFactura', {
     id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
     },
     descripcion: {
       type: DataTypes.STRING,
       allowNull: false
     }
   }, {
     tableName: 'EstadosFactura'
   });
 
   return EstadoFactura;
 };
 