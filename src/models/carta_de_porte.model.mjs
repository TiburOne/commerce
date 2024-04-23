export default (sequelize, DataTypes) => {
   const CartaDePortes = sequelize.define(
     "CartaDePortes",
     {
       id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
       },
       fecha: {
         type: DataTypes.DATE
       },
       nro_cpe: {
         type: DataTypes.INTEGER
       },
       peso_bruto_origen: {
         type: DataTypes.INTEGER
       },
       peso_neto_origen: {
         type: DataTypes.INTEGER
       },
       peso_tara_origen: {
         type: DataTypes.INTEGER
       },
       peso_bruto_destino: {
         type: DataTypes.INTEGER
       },
       peso_neto_destino: {
         type: DataTypes.INTEGER
       },
       peso_tara_destino: {
         type: DataTypes.INTEGER
       },
       procedencia_localidad: {
         type: DataTypes.STRING
       },
       procedencia_provincia: {
         type: DataTypes.STRING
       },
       procedencia_direccion: {
         type: DataTypes.STRING
       },
       procedencia_nro_planta: {
         type: DataTypes.INTEGER
       },
       destino_localidad: {
         type: DataTypes.STRING
       },
       destino_provincia: {
         type: DataTypes.STRING
       },
       destino_direccion: {
         type: DataTypes.STRING
       },
       destino_nro_planta: {
         type: DataTypes.INTEGER
       }
     },
     {
       tableName: "Cartas_De_Portes"
     }
   );
 
   CartaDePortes.associate = function(models) {
     CartaDePortes.hasMany(models.ViajeComun, { foreignKey: "id_carta_porte" });
   };
 
   return CartaDePortes;
 };
 