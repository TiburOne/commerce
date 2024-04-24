export default (sequelize, DataTypes) => {
   const ViajeComun = sequelize.define(
     "ViajeComun",
     {
       id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
       },
       origen: {
         type: DataTypes.STRING,
         allowNull: false
       },
       destino: {
         type: DataTypes.STRING,
         allowNull: false
       },
       id_especie: {
         type: DataTypes.INTEGER,
         allowNull: false
       },
       id_estado: {
         type: DataTypes.INTEGER,
         allowNull: false
       },
       id_tipo_acoplado: {
         type: DataTypes.INTEGER,
         allowNull: false
       },
       id_camion: {
         type: DataTypes.INTEGER,
         allowNull: false
       },
       id_acoplado:{
        type: DataTypes.INTEGER,
        allowNull: false
       },
       id_carta_porte: {
         type: DataTypes.INTEGER,
         allowNull: false
       }
     },
     {
       tableName: "Viajes_Comunes"
     }
   );
 
   ViajeComun.associate = function(models) {
     ViajeComun.belongsTo(models.Camion, { foreignKey: "id_camion" });
     ViajeComun.belongsTo(models.TipoAcoplado, { foreignKey: "id_tipo_acoplado" });
     ViajeComun.belongsTo(models.Especie, { foreignKey: "id_especie" });
     ViajeComun.belongsTo(models.EstadoViaje, { foreignKey: "id_estado" });
     ViajeComun.belongsTo(models.CartaDePorte, { foreignKey: "id_carta_porte" });
   };
 
   return ViajeComun;
 };
 