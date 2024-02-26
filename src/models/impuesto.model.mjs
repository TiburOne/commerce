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
     porcentaje: {
       type: DataTypes.DECIMAL(5, 2), // Ejemplo: 21.00 para un 21%
       allowNull: false
     }
   }, {
     tableName: 'Impuestos'
   });
 
   return Impuesto;
 };
 