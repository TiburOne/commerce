export default (sequelize, DataTypes) => {
   const Choferes = sequelize.define(
     "Choferes",
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
       title: {
         type: DataTypes.STRING
       },
       body: {
         type: DataTypes.TEXT,
         comment: 'Content of the post'
       },
       user_id: {
         type: DataTypes.INTEGER
       },
       status: {
         type: DataTypes.STRING
       },
       created_at: {
         type: DataTypes.DATE
       }
     },
     {
       tableName: "Choferes"
     }
   );
 
   Choferes.associate = function(models) {
     Choferes.belongsTo(models.Transportista, { foreignKey: "id_transportista" });
   };
 
   return Choferes;
 };
 