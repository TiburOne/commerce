export default (sequelize, DataTypes) => {
   const TipoCamion = sequelize.define(
     "TipoCamion",
     {
       id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
       },
       tipo: {
         type: DataTypes.STRING,
         allowNull: false
       }
     },
     {
       tableName: "Tipo_Camion"
     }
   );
 
   TipoCamion.associate = function(models) {
     TipoCamion.hasMany(models.Camiones, { foreignKey: "id_tipo_camion" });
     TipoCamion.hasMany(models.ViajeComun, { foreignKey: "id_tipo_camion" });
   };
 
   return TipoCamion;
 };
 