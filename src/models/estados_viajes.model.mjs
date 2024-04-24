export default (sequelize, DataTypes) => {
   const EstadoViaje = sequelize.define(
     "EstadoViaje",
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
 
   EstadoViaje.associate = function(models) {
     EstadoViaje.hasMany(models.ViajeComun, { foreignKey: "id_estado" });
   };
 
   return EstadoViaje;
 };
 