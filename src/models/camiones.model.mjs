export default (sequelize, DataTypes) => {
   const Camion = sequelize.define(
     "Camion",
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
       }
     },
     {
       tableName: "Camiones"
     }
   );
 
   Camion.associate = function(models) {
    Camion.belongsTo(models.Transportista, { foreignKey: "id_transportista", as: 'transportista' });
    Camion.hasMany(models.ViajeComun, { foreignKey: "id_camion", as: 'camion' });
   };
 
   return Camion;
 };
 