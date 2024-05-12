export default (sequelize, DataTypes) => {
   const ViajeComunTipoAcoplado = sequelize.define("ViajeTipoAcoplado", {
     idViaje: {
       type: DataTypes.INTEGER,
       allowNull: false,
       references: {
         model: 'Viajes_Comunes',
         key: 'id'
       }
     },
     idTipoAcoplado: {
       type: DataTypes.INTEGER,
       allowNull: false,
       references: {
         model: 'TipoAcoplados', // Asegúrate de que este es el nombre correcto del modelo
         key: 'id'
       }
     }
   }, {
     tableName: 'Viajes_TipoAcoplados'
   });
 
   return ViajeComunTipoAcoplado;
 };
 