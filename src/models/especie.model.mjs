export default (sequelize, DataTypes) => {
   const Especies = sequelize.define(
     "Especies",
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
 
   Especies.associate = function(models) {
     Especies.hasMany(models.ViajeComun, { foreignKey: "id_especie" });
   };
 
   return Especies;
 };
 