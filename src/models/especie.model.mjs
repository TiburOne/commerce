export default (sequelize, DataTypes) => {
   const Especie = sequelize.define(
     "Especie",
     {
       id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
       },
       nombre: {
         type: DataTypes.STRING,
         allowNull: false
       }
     },
     {
       tableName: "Especies"
     }
   );
 
   Especie.associate = function(models) {
     Especie.hasMany(models.ViajeComun, { foreignKey: "id_especie" });
   };
 
   return Especie;
 };
 