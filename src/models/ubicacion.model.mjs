export default (sequelize, DataTypes) => {
   const Ubicacion = sequelize.define(
     "Ubicacion",
     {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
       latitud: {
         type: DataTypes.DOUBLE,
         allowNull: false
       },
       longitud: {
         type: DataTypes.DOUBLE,
         allowNull: false
       },
       nombre: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
       },
       ciudad: {
         type: DataTypes.STRING,
         allowNull: false
       },
       provincia: {
         type: DataTypes.STRING,
         allowNull: false
       },
       direccion: {
        type: DataTypes.STRING,
        allowNull: true
      }
     },
     {
       tableName: "Ubicaciones"
     }
   );
   
   return Ubicacion;
 };
 