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
 
   Chofer.associate = function(models) {
    Chofer.belongsTo(models.Transportista, { foreignKey: "id_transportista" });
   };
 
   return Chofer;
 };
 