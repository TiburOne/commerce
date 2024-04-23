export default (sequelize, DataTypes) => {
   const EstadosViajes = sequelize.define(
     "EstadosViajes",
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
       tableName: "Estados_Viajes"
     }
   );
 
   EstadosViajes.associate = function(models) {
     EstadosViajes.hasMany(models.ViajeComun, { foreignKey: "id_estado" });
   };
 
   return EstadosViajes;
 };
 