export default (sequelize, DataTypes) => {
   const Transportista = sequelize.define(
     "Transportista",
     {
       id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
       },
       cuit: {
         type: DataTypes.INTEGER
       },
       nombre: {
         type: DataTypes.STRING,
         allowNull: false
       },
       email: {
         type: DataTypes.STRING,
         validate: {
           isEmail: true
         }
       },
       telefono: {
         type: DataTypes.STRING
       },
       password: {
         type: DataTypes.STRING
       }
     },
     {
       tableName: "Transportistas"
     }
   );
 
   Transportista.associate = function(models) {
     Transportista.hasMany(models.Camion, { foreignKey: "id_transportista",  });
     Transportista.hasMany(models.Chofer, { foreignKey: "id_transportista",  });
   };
 
   return Transportista;
 };
 