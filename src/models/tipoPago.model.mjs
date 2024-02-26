// TipoPago.model.mjs

export default (sequelize, DataTypes) => {
   const TipoPago = sequelize.define('TipoPago', {
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
     tableName: 'TiposPago'
   });
 
   return TipoPago;
 };
 