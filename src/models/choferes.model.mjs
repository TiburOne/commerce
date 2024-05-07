export default (sequelize, DataTypes) => {
   const Chofer = sequelize.define(
     "Chofer",
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
       nombre: {
         type: DataTypes.STRING
       },
       apellido: {
        type: DataTypes.STRING
       },
       telefono:{
        type: DataTypes.STRING
       }
     },
     {
       tableName: "Choferes"
     }
   );
 
   Chofer.associate = function(models) {
    Chofer.belongsTo(models.Transportista, { foreignKey: "id_transportista" });
   };
 
   return Chofer;
 };
 