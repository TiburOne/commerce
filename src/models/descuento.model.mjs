// Descuento.model.mjs

export default (sequelize, DataTypes) => {
   const Descuento = sequelize.define('Descuento', {
     id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
     },
     descripcion: {
       type: DataTypes.STRING,
       allowNull: false
     },
     porcentajeDescuento: {
       type: DataTypes.DECIMAL(5, 2),
       allowNull: false
     },
     cantidadMinima: {
       type: DataTypes.INTEGER,
       allowNull: false,
       defaultValue: 1
     },
     productoId: {
       type: DataTypes.INTEGER,
       allowNull: true
     },
     clienteId: {
       type: DataTypes.INTEGER,
       allowNull: true
     },
     fechaInicio: {
       type: DataTypes.DATE,
       allowNull: false
     },
     fechaFin: {
       type: DataTypes.DATE,
       allowNull: false
     }
   }, {
     tableName: 'Descuentos'
   });
 
   Descuento.associate = function(models) {
     // Asociaciones aquí si son necesarias
   };
 
   return Descuento;
 };
 