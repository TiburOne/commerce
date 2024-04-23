export default (sequelize, DataTypes) => {
   const Camiones = sequelize.define(
     "Camiones",
     {
       id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
       },
       id_transportista: {
         type: DataTypes.INTEGER,
         allowNull: false
       },
       dominio: {
         type: DataTypes.STRING,
         allowNull: false
       },
       id_tipo_camion: {
         type: DataTypes.INTEGER,
         allowNull: false
       },
       created_at: {
         type: DataTypes.DATE
       }
     },
     {
       tableName: "Camiones"
     }
   );
 
   Camiones.associate = function(models) {
     Camiones.belongsTo(models.Transportista, { foreignKey: "id_transportista" });
     Camiones.belongsTo(models.TipoCamion, { foreignKey: "id_tipo_camion" });
     Camiones.hasMany(models.ViajeComun, { foreignKey: "id_camion" });
   };
 
   return Camiones;
 };
 