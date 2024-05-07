export default (sequelize, DataTypes) => {
  const TipoAcoplado = sequelize.define(
    "TipoAcoplado",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tipo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cantidad_ejes: {
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: "Tipos_Aclopados",
    }
  );

  TipoAcoplado.associate = function (models) {
    TipoAcoplado.hasMany(models.Acoplado, { foreignKey: "id_tipo_acoplado", as: "Acoplados" });
    TipoAcoplado.hasMany(models.ViajeComun, { foreignKey: "id_tipo_acoplado", as:"Viajes_Comunes"});
  };

  return TipoAcoplado;
};
